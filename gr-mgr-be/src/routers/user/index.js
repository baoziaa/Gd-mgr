const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { verify, getToken } = require('../../helpers/token');
const { loadExcel, getFirstSheet } = require('../../helpers/excel');

// const { getBody } = require('../../helpers/utils');

const User = mongoose.model('User');
const Character = mongoose.model('Character');

const router = new Router({ //实例化
  prefix: '/user',  //路由前缀
});

// 获取用户列表
router.get('/list', async (ctx) => {
  let{
    page,
    size,
    keyword,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  // console.log(page,size);

  const query = {};

  if (keyword) {
    query.account = keyword;
  }

  const list = await User
    .find(query)
    .sort({
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();
  
  const total = await User.countDocuments().exec();

  ctx.body = {
    msg: '获取列表成功',
    data: {
      list,
      page,
      size,
      total,
    },
    code: 1,
  };
});

// 删除用户
router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await User.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    code: 1,
    msg: '删除成功'
  };
});

// 添加用户
router.post('/add', async (ctx) => {
  const {
    account,
    password,
    character,
  } = ctx.request.body;

  const char = Character.findOne({
    _id: character,
  });

  if (!char) {
    ctx.body = {
      msg: '出错啦',
      code: 0,
    };

    return;
  }

  const user = new User({
    account,
    password: password || 123123, //如果密码为空,默认为123123
    character,
  });


  const res = await user.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '添加成功',
  };

});

// 批量添加用户
router.post('/addMany', async (ctx) => {
  const {
    key = '', //文件名
  } = ctx.request.body;
  // 文件路径
  const path = `${config.UPLOAD_DIR}/${key}`;
  // 传入路径,读取Excel文件
  const excel = loadExcel(path);
  // 拿到第一个sheet数据
  const sheet = getFirstSheet(excel);

  // 查找角色信息
  const character = await Character.find().exec();
  // console.log(character);

  // 设置上传的用户是普通成员
  const member1 = character.find((item) => (item.name === 'member1'));

  // console.log(member1);

  // console.log(sheet);
  // 设置一个空数组
  const arr = [];

  // 遍历
  for (let i = 0; i < sheet.length; i++) {
    const record = sheet[i];

    // 默认密码是123123
    const [account, password = config.DEFAULT_PASSWORD] = record;

    const one = await User.findOne({
      account,
    });

    // 如果存在这个角色信息就跳过
    if (one) {
      continue;
    }

    // 把账户密码以及角色信息推送到数组里面
    arr.push({
      account,
      password,
      character: member1._id,
    });
    
  }
/*   sheet.forEach((record) => {
    const [account, password = config.DEFAULT_PASSWORD] = record;

    arr.push({
      account,
      password,
      character: member1._id,
    });
  }); */

  await User.insertMany(arr);

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: {
      addCount: arr.length,
    },
  };
  
});

// 重置密码
router.post('/reset/password', async (ctx) => {
  const {
    id,
  } = ctx.request.body;

  const user = await User.findOne({
    _id: id,
  }).exec();

  if (!user) {
    ctx.body = {
      msg: '找不到用户',
      code: 0,
    };

    return;
  };

  user.password = config.DEFAULT_PASSWORD;

  const res = await user.save();

  ctx.body = {
    msg: '重置成功',
    code: 1,
    data: {
      account: res.account,
      _id: res._id,
    }
  };
  
});

// 修改用户角色
router.post('/update/character', async (ctx) => {
  const {
    character,
    userId,
  } = ctx.request.body;

  const char = await Character.findOne({
    _id: character,
  });

  console.log('1'+char+character);
  if (!char) {
    ctx.body = {
      msg: '出错啦',
      code: 0,
    };

    return;
  }

  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    ctx.body = {
      msg: '出错啦',
      code: 0,
    };
  }

  user.character = character;

  const res = user.save();

  ctx.body = {
    data: res,
    msg: '修改成功',
    code: 1,
  }
  
});

// 根据token换取用户的信息,解密一下token
router.get('/info', async (ctx) => {
  // Authorization Bearer %^&fjsalkjfajfasj
  ctx.body = {
    data: await verify(getToken(ctx)),
    code: 1,
    msg: '获取成功',
  };

});


module.exports = router;  //导出这个路由

