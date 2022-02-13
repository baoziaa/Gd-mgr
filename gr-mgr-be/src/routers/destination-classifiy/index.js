const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel

// const { getBody } = require('../../helpers/utils');

const DestinationClassifiy = mongoose.model('DestinationClassifiy');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/destination-classifiy',  //路由前缀
});

router.get('/list', async (ctx) => {
  const list = await DestinationClassifiy.find().sort({
    _id: -1,
  }).exec();

  ctx.body = {
    data: list,
    code: 1,
    msg: '获取列表成功',
  };

});

router.post('/add', async (ctx) => {
  const {
    title,
  } = ctx.request.body;

  const one = await DestinationClassifiy.findOne({
    title,
  }).exec();

  if (one) {
    ctx.body = {
      msg: '书籍分类已经存在',
      code: 0,
    };

    return;
  };

  if (!title) {
    ctx.body = {
      msg: '内容为空',
      code: 0,
    };

    return;
  };
  
  const destinationClassifiy = new DestinationClassifiy({
    title,
  });

  const saved = await destinationClassifiy.save();

  ctx.body = {
    data: saved,
    code: 1,
    msg: '生成成功',
  };

});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const res = await DestinationClassifiy.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: res,
    code: 1,
    msg: '删除成功!'
  };

});

router.post('/update/title', async (ctx) => {
  const {
    id,
    title,
  } = ctx.request.body;


  const one = await DestinationClassifiy.findOne({
    _id: id,
  });

  if (!one) {
    ctx.body = {
      msg: '资源不存在',
      code: 0,
    };

    return;
  }


  one.title = title._value;

  const res = await one.save();

  ctx.body = {
    data: res,
    msg: '修改成功',
    code: 1,
  };
});




module.exports = router;  //导出这个路由

