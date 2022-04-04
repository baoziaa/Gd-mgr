const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');  //从helpers.js那里拿到getMate这个元信息

const LogSchema = new mongoose.Schema({
  // 日志访问的用户信息
  user: {
    // 账户
    account: String,
    id: String,
  },
  // 日志请求的相关信息
  request: {
    // 记录请求方法
    method: String,
    // 请求的url地址
    url: String,
    // 请求的内容
    // responseBody: String,
    // 状态码
    status: Number
  },

  startTime: Number,
  endTime: Number,
  show: Boolean,

  meta: getMeta(), 
});

LogSchema.pre('save',preSave);

mongoose.model('Log',LogSchema);  //注册为一个模型