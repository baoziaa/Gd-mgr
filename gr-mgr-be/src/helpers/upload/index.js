const fs = require('fs');

// 文件保存到硬盘中,所有请求相关的内容都在ctx里面取,filename文件名
const saveFileToDisk = (ctx, filename) => {
  // 异步操作
  return new Promise((resolve, reject) => {
    // 拿到文件
    const file = ctx.request.files.file;
    // 创建读的流,把文件一点一点的读进来,通过reader去处理对应的流
    const reader = fs.createReadStream(file.path);
    // 创建写的流,把文件一点一点的写进来,filename传进来的是一个文件名(路径),可以定位到文件资源
    const writeStream = fs.createWriteStream(filename);

    //reader拿到之后丢给writeStream继续做处理
    reader.pipe(writeStream);

    // 当文件写完之后
    reader.on('end', () => {
      // 文件路径传过去
      resolve(filename);
    });

    reader.on('error', () => {
      reject(err);
    });

  });
};


// 提取上传文件的后缀名
const getUploadFileExt = (ctx) => {
  // 拿到文件
  const { name = '' } = ctx.request.files.file;
  // 用split分割取.后面部分
  return name.split('.').pop();
};


module.exports = {
  saveFileToDisk,
  getUploadFileExt,
};