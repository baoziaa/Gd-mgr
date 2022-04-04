const auth = require('./auth');  //引入auth文件夹下的index.js文件(那边导出我就可以引入)
const inviteCode = require('./Invite-code'); //引入Incite-code
const record = require('./record'); //引入routers下面的record下面的index.js,index.js文件可以省略
const user = require('./user');
const character = require('./character');
const log = require('./log');
const forgetPassword = require('./forget-password');
const DestinationClassifiy = require('./destination-classifiy');
const profile = require('./profile');
const dashboard = require('./dashboard');
const upload = require('./upload');
const map = require('./map');
const MessageBoard = require('./message-board');



module.exports = (app) => { //导出
  //注册中间件
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(record.routes());
  app.use(user.routes());
  app.use(character.routes());
  app.use(log.routes());
  app.use(forgetPassword.routes());
  app.use(DestinationClassifiy.routes());
  app.use(profile.routes());
  app.use(dashboard.routes());
  app.use(upload.routes());
  app.use(map.routes());
  app.use(MessageBoard.routes());
};