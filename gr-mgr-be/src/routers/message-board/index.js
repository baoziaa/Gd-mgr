const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel

// const { getBody } = require('../../helpers/utils');

const MessageBoard = mongoose.model('MessageBoard');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/message-board',  //路由前缀
});

router.get('/list', async (ctx) => {

  let{
    page,
    size,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const list = await MessageBoard
  .find()
  .sort({
    _id: -1,
  })
  .skip((page - 1) * size)
  .limit(size)
  .exec();

  const total = await MessageBoard.countDocuments().exec();

  ctx.body = {
    code: 1,
    data: {
      list,
      page,
      size,
      total,
    },
    msg: '获取列表成功',
  };

});

router.post('/add', async (ctx) => {
  const {
    substance,
  } = ctx.request.body;

  const one = await MessageBoard.findOne({
    substance,
  }).exec();

  if (one) {
    ctx.body = {
      msg: '相同反馈内容已存在',
      code: 0,
    };

    return;
  };

  if (!substance) {
    ctx.body = {
      msg: '内容不能为空',
      code: 0,
    };

    return;
  };
  
  const messageboard = new MessageBoard({
    substance,
  });

  const saved = await messageboard.save();

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

  const res = await MessageBoard.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: res,
    code: 1,
    msg: '删除成功!'
  };

});

router.post('/update/substance', async (ctx) => {
  const {
    id,
    substance,
  } = ctx.request.body;


  const one = await MessageBoard.findOne({
    _id: id,
  });

  if (!one) {
    ctx.body = {
      msg: '资源不存在',
      code: 0,
    };

    return;
  }


  one.substance = substance;

  // console.log(substance);

  const res = await one.save();

  ctx.body = {
    data: res,
    msg: '修改成功',
    code: 1,
  };
});




module.exports = router;  //导出这个路由

