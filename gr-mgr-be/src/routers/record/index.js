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
    salary,
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
    salary,
    tel,
  });
  const res = await record.save();
  // console.log(res);
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
    .sort({
      _id: -1,
    })
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


// 修改的接口
router.post('/update', async (ctx) => {
  // ...是ES6提供的新的特性,根据场景可以为拓展运算符或叫剩余参数.others里是集合成的一个对象.
  const {
    _id,
    // stuid,
    // name,
    // sex,
    // major,
    // gclass,
    // graddate,
    // grad,
    // city,
    // unitname,
    // nature,
    // industry,
    // location,
    // salary,
    // tel,
    ...others
  } = ctx.request.body;

  // 根据id值进行查找
  const one = await Record.findOne({
    _id: _id,
  }).exec();

  // 没有找到数据的时候
  if(!one) {
    ctx.body = {
      msg: '没有找到数据',
      code: 0,
    };
    return;
  }

  // 空对象
  const newQuery = {};

  // 遍历,如果有value值就放在newQuery对象里.
  Object.entries(others).forEach(([key,value]) => {
    if (value) {
      newQuery[key] = value;
    }
  });

  // 合并对象,把修改后的(newQuery)合并到查找到的这条记录(one)里面
  Object.assign(one,newQuery);

  // 数据保存到数据库里
  const res = await one.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '保存成功'
  };
  
});

module.exports = router;  //导出这个路由

