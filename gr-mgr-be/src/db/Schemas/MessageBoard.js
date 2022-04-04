const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');  //从helpers.js那里拿到getMate这个元信息

const MessageBoardSchema = new mongoose.Schema({
  // 内容
  substance: String,

  meta: getMeta(), 
});

MessageBoardSchema.pre('save',preSave);

mongoose.model('MessageBoard',MessageBoardSchema);  //注册为一个模型,名字为MessageBoard,传递给它MessageBoardSchema