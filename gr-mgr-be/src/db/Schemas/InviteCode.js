const mongoose = require('mongoose');
const { getMate } = require('../helpers');  //从helpers.js那里拿到getMate这个元信息

const InviteCodeSchema = new mongoose.Schema({
  // 邀请码
  code: String,
  // 用来注册哪个账户
  user: String,

  meta: getMate(), 
});

mongoose.model('InviteCode',InviteCodeSchema);  //注册为一个模型,名字为InviteCode,传递给它InviteCodeSchema