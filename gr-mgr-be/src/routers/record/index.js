const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel
const { getBody } = require('../../helpers/utils');

const Record = mongoose.model('Record');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/record',  //路由前缀
});

// 添加接口
router.post('/add', async (ctx) => {
  const {
    stuid,
    name,
    sex,
    major,
    gclass,
    graddate,
    grad,
    city,
    unitname,
    nature,
    industry,
    location,
    tel,
  } = getBody(ctx);

  const record = new Record({
    stuid,
    name,
    sex,
    major,
    gclass,
    graddate,
    grad,
    city,
    unitname,
    nature,
    industry,
    location,
    tel,
  });
  const res = await record.save();
  console.log(res);
  ctx.body = {
    data: res,
    code: 1,
    msg: '添加成功',
  }
});

// 获取数据列表接口
router.get('/list', async (ctx) => {
  // https://aa.bb.com/user?page=2&size=20&keyword=名称#fdsafds
  // 从前端拿到page页码和size条数
  const {
    page = 1,
    keyword = '',
  } = ctx.query;

  let {
    size = 10,
  } = ctx.query;

  size = Number(size);
  // 2 20
  // 20 20
  // (page - 1) ) size

  const query = {};

  if (keyword) {
    query.name = keyword;
  }

  const list = await Record
    .find(query)
    // 跳过的条数
    .skip((page - 1) * size)
    // 每页限制显示的条数
    .limit(size)
    .exec();


  const total = await Record.countDocuments();

  ctx.body = {
    data: {
      total,
      list,
      page,
      size,
    },
    code: 1,
    msg: '获取数据列表成功',
  };
});

// 删除的接口
router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await Record.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    msg: '删除成功',
    code:1,
  };
});


module.exports = router;  //导出这个路由

