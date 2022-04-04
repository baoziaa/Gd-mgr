const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel

// const { getBody } = require('../../helpers/utils');

const Record = mongoose.model('Record');//对应的Recordmodel


const router = new Router({ //实例化
  prefix: '/map',  //路由前缀
});

router.get('/list', async (ctx) => {


  const list = await Record.find().sort({
    _id: -1,
  }).exec();

  const total = await Record.countDocuments();

  ctx.body = {
    data: {
      total,
      list,
    },
    code: 1,
    msg: '获取数据列表成功',
  };

});



module.exports = router;  //导出这个路由

