const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel
const { v4: uuidv4 } = require('uuid');

// const { getBody } = require('../../helpers/utils');

const InviteCode = mongoose.model('InviteCode');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/invite',  //路由前缀
});

router.post('/add', async (ctx) => {
  const {
    count = 1,
  } = ctx.request.body;

  const arr = [];

  for (let i = 0; i < count; i++)
    arr.push({
      code: uuidv4(),
      user: '',
    });

  const res = await InviteCode.insertMany(arr);


  ctx.body = {
    code: 1,
    data: res,
    msg:'创建成功',
  }
});

router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.request.query;

  page = Number(page);
  size = Number(size);

  const total = await InviteCode.countDocuments();
  
  const list = await InviteCode
    .find()
    .sort({
      _id: -1,
    })
    .skip((page-1)*size)
    .limit(size)
    .exec();

  ctx.body = {
    data: {
      list,
      total,
      page,
      size,
    },
    msg: '获取列表成功',
    code: 1,
  };

});

router.delete('/:id', async (ctx) => {
   const {
     id,
   } = ctx.params;

   const res = await InviteCode.deleteOne({
     _id: id,
   });

   ctx.body = {
    data: res,
    msg: '删除成功',
    code: 1,
  };

});




module.exports = router;  //导出这个路由

