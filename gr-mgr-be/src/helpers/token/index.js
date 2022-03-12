const jwt = require('jsonwebtoken');  //引入jsonwebtoken
const config = require('../../project.config'); //引入配置项,config.JWT_SECRET密钥
const koaJwt = require('koa-jwt');


// 获取token 因为token的形式是 Authorization Bearer %^&fjsalkjfajfasj ,所以要去掉Bearer 
const getToken = (ctx) => {
  // 响应头中获取到authorization
  const { authorization } = ctx.header;

  // replace把Bearer替换成'',空字符串
  return authorization.replace('Bearer ','').replace('bearer ',''); //大小写的情况都要考虑到
}


//解密一个token分为三部分,加密算法、payload和密钥
const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err,payload) => {    //第一个参数就是生成的token,第二个参数就是payload加密内容部分,第三部分就是一个函数,这个函数有两个参数,第一个参数是err表示解密错误,第二个参数指payload成功返回的内容
      if (err) {
        reject(err);
        return;
      }
      // 解析成功,解析后的结果返回
      resolve(payload);
      // console.log(payload);
  });
  });
};

// 注册一个koaJwt生成的中间件,解析请求带来的token是否正常,正常往下走,不正常就会报错,用catchTokenError进行捕获
const middleWare = (app) => {
  app.use(koaJwt({
    secret: config.JWT_SECRET,
  }).unless({
    path: [ //path里面表示哪些路径是不需要做校验的
      /^\/auth\/login/, //正则表达式登录的接口
      /^\/auth\/register/, //注册的接口
      /^\/forget-password\/add/, //忘记密码申请的接口
    ],
  }));
};

// 如果解析报错用catchTokenError注册中间件进行捕获
const catchTokenError = async (ctx, next) => {
  return next().catch((error) => {
    // 捕获的状态进行判断,401认证失败进行响应数据
    if (error.status === 401) {
      ctx.status = 401;

      ctx.body = {
        code: 0,
        msg: 'token error',
      };
    } else {
      throw error;
    }
  });
};


module.exports = {
  verify,
  getToken,
  middleWare,
  catchTokenError,
};