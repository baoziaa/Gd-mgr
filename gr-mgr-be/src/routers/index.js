const auth = require('./auth');  //引入auth文件夹下的index.js文件(那边导出我就可以引入)
const inviteCode = require('./Invite-code'); //引入Incite-code
const record = require('./record') //引入routers下面的record下面的index.js,index.js文件可以省略

module.exports = (app) => { //导出
  //注册中间件
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(record.routes());
};