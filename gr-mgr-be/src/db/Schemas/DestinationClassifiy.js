const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');  //从helpers.js那里拿到getMate这个元信息

const DestinationClassifiySchema = new mongoose.Schema({
  // 标题
  title: String,

  meta: getMeta(), 
});

DestinationClassifiySchema.pre('save',preSave);

mongoose.model('DestinationClassifiy',DestinationClassifiySchema);  //注册为一个模型,名字为InviteCode,传递给它InviteCodeSchema