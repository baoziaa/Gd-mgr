const { verify, getToken} = require('../token');
const mongoose = require('mongoose');

const Log = mongoose.model('Log');
const LogResponse = mongoose.model('LogResponse');

// 在gr-mgr-be\src\index.js路径下进行注册中间件
const logMiddleware = async (ctx, next) => {

  // 记录的请求的开始时间
  const startTime = Date.now();

  await next();

  let payload = {};
  
  try {
    // 得到了用户相关的信息:通过解析token,拿到用户的数据
   payload = await verify(getToken(ctx));
  } catch (e) {
    // 如果解析错误告诉他是位置用户
    payload = {
      account: '未知用户',
      id: '',
    };
  }


  // 获取到请求信息里面的url地址
  const url = ctx.url;
  // 请求方法
  const method = ctx.method;
  // 请求状态
  const status = ctx.status;

  let show = true;
  
  if (url === '/log/delete') {
    show = false;
  }

  

  // console.log(url,payload);
  let responseBody = '';

  if (typeof ctx.body === 'string') {
    responseBody = ctx.body;
  } else {
    try {
      // 如果ctx.body不是字符串就统一成JSON.stringify处理,如果还不能解析就设置为空字符串
      responseBody = JSON.stringify(ctx.body);
    } catch { //用不到(e)的错误信息可以不加(ES比较新的标准提供的语法)
      responseBody = '';
    }
  }

  // 记录的请求的结束时间
  const endTime = Date.now();

 const log = new Log({
    user: {
      account: payload.account,
      id: payload.id,
    },
    request: {
      url,
      // responseBody,
      method,
      status,
      startTime,
      endTime,
      show,
    }
  });


  log.save();

  const logRes = new LogResponse({
    logId:log._id,
    data:responseBody,
  });

  logRes.save();

};



module.exports = {
  logMiddleware,
};
