const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');  //从helpers.js那里拿到getMate这个元信息

const CharacterSchema = new mongoose.Schema({
  name: String, //member admin
  title: String, //展示的文案 对应上面的成员 管理员
  power: Object, //权限
  //这个元信息(包括创建的时间和修改的时间)是每一个Schema都有的我们把它独立出来,放在db下面helpers.js里面写一个方法,返回这个对象
  meta: getMeta(),  //调用getMate()这个方法,拿到里面的对象
});

CharacterSchema.pre('save',preSave);

mongoose.model('Character',CharacterSchema);  //注册为一个模型,名字为User,传递给它UserSchema