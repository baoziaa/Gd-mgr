const auth = require('./auth');  //引入auth文件夹下的index.js文件(那边导出我就可以引入)
const inviteCode = require('./Invite-code'); //引入Incite-code

module.exports = (app) => { //导出
  app.use(auth.routes()); //注册中间件
  app.use(inviteCode.routes()); //注册
};