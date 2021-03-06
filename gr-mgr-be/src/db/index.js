const mongoose = require('mongoose')

//给哪个数据库
//哪个集合
//添加什么格式的文档

//Schema
//Modal 可以理解成是根据Schema生成的一套方法,这套方法用来操作MongoDB下的文档


const UserSchema = new mongoose.Schema({
  nickname:String,
  password:String,
  age:Number,
});

const UserModal = mongoose.model('User',UserSchema)   //User+个s是集合的名字

const connect = () => {
  //连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/gr-mgr');
  //监听当数据库开启调用这个函数,当数据库打开的时候 做一些事情
  mongoose.connection.on('open',() => {
    console.log('连接成功');

    //链接成功后创建
    const user = new UserModal({
      nickname: '小赵',
      password: '123456',
      age:22,
    });
    // user.age =99;
    //保存,同步到MongoDB
    user.save();
  });
};

connect();  //调用执行一下