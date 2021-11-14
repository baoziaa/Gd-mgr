const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel
const { v4: uuidv4 } = require('uuid');

// const { getBody } = require('../../helpers/utils');

const InviteCode = mongoose.model('InviteCode');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/invite',  //路由前缀
});

router.get('/add', async (ctx) => {
  const code = new InviteCode({
    code: uuidv4(),
    user: '',
  });

  const saved =  await code.save();

  ctx.body = {
    code: 1,
    data: saved,
    msg:'创建成功',
  }
});


module.exports = router;  //导出这个路由

