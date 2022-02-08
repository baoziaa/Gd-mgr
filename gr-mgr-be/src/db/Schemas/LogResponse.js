const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');  //从helpers.js那里拿到getMate这个元信息

const LogResponseSchema = new mongoose.Schema({
  // 日志Id
  LogId: String,
  // 数据
  data: String,

  meta: getMeta(), 
});

LogResponseSchema.pre('save',preSave);

mongoose.model('LogResponse',LogResponseSchema);  //注册为一个模型,名字为InviteCode,传递给它InviteCodeSchema