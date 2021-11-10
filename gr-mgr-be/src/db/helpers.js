//定义个getMate一个方法,直接返回Schemas下面User.js里UserSchema的meta里的一个对象就好了
const getMate = () => {
  return {
    createdAt: {  //表示它什么时候创建的
      type: Number,
      default: (new Date()).getTime(),  //获取当前的时间戳
    },
    updatedAt: {  //表示什么时候被更新的
      type: Number,
      default: (new Date()).getTime(),  //被插入被创建的时候的一个时间戳
    },
  };
};

//导出这个通用的元信息,在User.js那导入
module.exports = {
  getMate,
};