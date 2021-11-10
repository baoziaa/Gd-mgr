const router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel

const User = mongoose.model('User');//对应的Usermodel

const authRouter = new router({ //实例化
  prefix: '/auth',  //通过auth前缀去区分这个router这个业务逻辑是属于哪一块的
});

authRouter.post('/register', async (ctx) => { //如果是get请求,/auth/register的路径就会响应里面的信息,ctx是context参数的缩写
//   console.log(ctx.request.body); 取到值了
  const {
      account,
      password,
  } = ctx.request.body;

  const one = await User.findOne({  //异步操作,await等他加载之后判断是否已存在
      account,
  }).exec();//执行一下

  if (one) {
    ctx.body = {  //返回一个json数据
      code: 0,
      msg: '已存在该用户,注册失败!',
      data: null,
    };
    return;
  }

  // ctx.body = '注册成功';
  const user = new User({
    //对象的简洁表示法
    account,
    password,
  });

  const res = await user.save();  //保存之后会吐一些信息给我们

  ctx.body = {  //返回一个json数据
    code: 1,
    msg: '注册成功',
    data: res,
  };
});
authRouter.post('/login', async (ctx) => { //如果是get请求,/auth/register的路径就会响应里面的信息,ctx是context参数的缩写
  ctx.body = '登陆成功';
});

module.exports = authRouter;  //导出这个路由

