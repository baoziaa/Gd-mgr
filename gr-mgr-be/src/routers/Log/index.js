const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel

// const { getBody } = require('../../helpers/utils');

const Log = mongoose.model('Log');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/log',  //路由前缀
});

router.get('/list', async (ctx) => {
  
  let {
    page,
    size,
  } = ctx.query;

  page = Number(page);
  size = Number(size);


  const list = await Log
    .find({
      // show: true
    })
    .sort({
      _id: -1,
    })
    .skip((page-1)*size)
    .limit(size)
    .exec();
  
  const total = await Log.countDocuments().exec();
    
  ctx.body = {
    data: {
      list,
      page,
      size,
      total,
    },
    code: 1,
    msg: '获取列表成功',
  };
    
});


router.post('/delete', async (ctx) => {
  const {
    id,
  } = ctx.request.body;

  const res = await Log.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: res,
    msg: '删除成功',
    code: 1,
  };

  
  
});


module.exports = router;  //导出这个路由

