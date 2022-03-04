const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel
const { v4: uuidv4 } = require('uuid');
const { verify, getToken } = require('../../helpers/token');

// const { getBody } = require('../../helpers/utils');

const User = mongoose.model('User');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/profile',  //路由前缀
});


router.post('/update/password', async (ctx) => {
  const {
    oldPassword,
    password,
  } = ctx.request.body;



  const payload = await verify(getToken(ctx));
  const { _id } = payload;
  
  const user = await User.findOne({
    _id,
  }).exec();

  console.log(user);

  if (!user) {
    ctx.body = {
      msg: '用户不存在',
      code: 0,
    }

    return;
  }

  if (user.password !== oldPassword) {
    ctx.body = {
      msg:'密码校验失败',
      code: 0,
    };

    return;
  }

  user.password = password;


  await user.save();

  ctx.body = {
    msg: '修改成功',
    code: 1,
  };
  
});



module.exports = router;  //导出这个路由

