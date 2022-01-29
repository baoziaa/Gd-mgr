const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel

// const { getBody } = require('../../helpers/utils');

const Character = mongoose.model('Character');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/character',  //路由前缀
});

router.get('/list', async (ctx) => {
  const list = await Character.find().exec();

  ctx.body = {
    data: list,
    code: 1,
    msg:'获取角色列表成功',
  }
});


module.exports = router;  //导出这个路由

