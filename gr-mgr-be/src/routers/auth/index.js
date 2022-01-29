const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel
const { getBody } = require('../../helpers/utils');
const jwt = require('jsonwebtoken');
const sign = require('jsonwebtoken/sign');

const User = mongoose.model('User');//对应的Usermodel
const InviteCode = mongoose.model('InviteCode');//对应的Usermodel

const authRouter = new Router({ //实例化
  prefix: '/auth',  //通过auth前缀去区分这个router这个业务逻辑是属于哪一块的
});

authRouter.post('/register', async (ctx) => { //如果是get请求,/auth/register的路径就会响应里面的信息,ctx是context参数的缩写
//   console.log(ctx.request.body); 取到值了
  const {
      account,
      password,
      inviteCode,
  } = getBody(ctx);

  // 做表单校验
  if (account === '' || password === '' || inviteCode === '') {
    ctx.body = { 
        code: 0,
        msg: '字段不能为空',
        data: null,
      };

      return;
  }

  // 有没有邀请码
  const findCode = await InviteCode.findOne({
    code: inviteCode,
  }).exec();

  // 如果没找到邀请码,或邀请码已存在
  if((!findCode) || findCode.user) {
    ctx.body = {  //返回一个json数据
        code: 0,
        msg: '邀请码不正确',
        data: null,
      };

      return;
  }


  // 去找account为传递上来"account"的用户
  const findUser = await User.findOne({  //异步操作,await等他加载之后判断是否已存在
      account,
  }).exec();//执行一下

  // 判断有没有用户
  if (findUser) {
    //   如果有表示已经存在
    ctx.body = {  //返回一个json数据
      code: 0,
      msg: '已存在该用户,注册失败!',
      data: null,
    };
    return;
  }

  // 创建一个用户
  const user = new User({
    //对象的简洁表示法
    account,
    password,
  });
  // 把创建的用户同步到mongodb
  const res = await user.save();

  findCode.user = res._id; //拿到这个id作为用户唯一标识,赋值给findCode.user
  findCode.meta.updateAt = new Date().getTime(); // 更新当前时间戳

  await findCode.save(); //更新之后保存数据
  // 响应成功
  ctx.body = {  //返回一个json数据
    code: 1,
    msg: '注册成功',
    data: res,
  };
});
authRouter.post('/login', async (ctx) => { //如果是get请求,/auth/register的路径就会响应里面的信息,ctx是context参数的缩写
    const {
        account,
        password,
    } = getBody(ctx);

    if (account === '' || password === '') {
        ctx.body = { 
            code: 0,
            msg: '字段不能为空',
            data: null,
          };
    
          return;
    }
    // console.log(password,account);

    //去找我们数据库有没有这个用户
    const findUser = await User.findOne({    //因为返回的是一个Promise
        account,    //为传进来我们的用户值
    }).exec();
    // console.log(one.password,one.account);
    // console.log(password,account);

    // console.log(one);
    //判断有没有用户名或密码的情况
    if(!findUser) {
        ctx.body = {
            code: 0,
            msg: '用户名或密码错误',    //通过文案混淆视听,安全机制高一点
            data: null,
        };
        
        return;
    }

    const user = {  //重新构建一下
        account: findUser.account,   //mongoose查到的数据,它是经过一系列处理的,不是纯粹的对象,所以生成token的时候就不能处理到这个对象,所以我们可以自己去构建一个
        character: findUser.character,
        _id: findUser._id,
    };

    // 传入的密码等于数据库的密码的情况
    if(findUser.password === password) {
        ctx.body = {
            code: 1,
            msg: '登入成功', 
            data: {
                user,   //直接把user返回
                token: jwt.sign(user, 'baozi'),  //引入jwt,用sign方法,第一个是传入的参数加密内容,第二个参数是密钥
            },
        };
        return;
    }
    //密码错误的情况
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    };

});

module.exports = authRouter;  //导出这个路由

