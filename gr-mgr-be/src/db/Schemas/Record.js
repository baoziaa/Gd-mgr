const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');  //从helpers.js那里拿到getMate这个元信息

const RecordSchema = new mongoose.Schema({
    // 学号
    stuid: String,
    // 姓名
    name: String,
    // 性别
    sex: String,
    // 专业
    major: String,
    // 班级
    gclass: String,
    // 毕业日期
    graddate: String,
    // 毕业去向
    grad: String,
    // 去向城市
    city: String,
	// 单位名称(xx公司),
    unitname: String,
	// 单位性质(国有企业),
    nature: String,
	// 单位行业(交通运输、仓储、邮政业),
    industry: String,
    // 单位所在地
    location: String,
    // 毕业薪资
    salary: Number,
    // 联系电话
    tel: String,

  //这个元信息(包括创建的时间和修改的时间)是每一个Schema都有的我们把它独立出来,放在db下面helpers.js里面写一个方法,返回这个对象
  meta: getMeta(),  //调用getMate()这个方法,拿到里面的对象
});

RecordSchema.pre('save',preSave);

mongoose.model('Record',RecordSchema);  //注册为一个模型,名字为User,传递给它UserSchema