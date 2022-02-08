const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');  //从helpers.js那里拿到getMate这个元信息

const ForgetPasswordSchema = new mongoose.Schema({
  // 账户
  account: String,
  // 1 待处理 2 已重置 3 已忽略
  status: Number,

  meta: getMeta(), 
});

ForgetPasswordSchema.pre('save',preSave);

mongoose.model('ForgetPassword',ForgetPasswordSchema);  //注册为一个模型,名字为InviteCode,传递给它InviteCodeSchema