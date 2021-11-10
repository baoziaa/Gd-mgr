const auth = require('./auth/index.js');  //引入auth文件夹下的index.js文件(那边导出我就可以引入)

module.exports = (app) => { //导出
  app.use(auth.routes()); //注册中间件
};