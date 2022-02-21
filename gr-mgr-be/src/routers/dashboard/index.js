const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel

// const { getBody } = require('../../helpers/utils');

const User = mongoose.model('User');//对应的Usermodel
const Record = mongoose.model('Record');//对应的Recordmodel
const Log = mongoose.model('Log');//对应的Logmodel

const router = new Router({ //实例化
  prefix: '/dashboard',  //路由前缀
});

router.get('/base-info', async (ctx) => {
  const recordTotal = await Record.countDocuments();
  const userTotal = await User.countDocuments();
  const logTotal = await Log.countDocuments();

  ctx.body = {
    data: {
      total: {
        record: recordTotal,
        user: userTotal,
        log: logTotal,
      },
    },
    code: 1,
    msg: '获取成功',
  };


  
});






module.exports = router;  //导出这个路由

