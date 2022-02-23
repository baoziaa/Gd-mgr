// 获取当前模块文件所在目录的完整绝对路径
const path = require('path');

module.exports = {
  DEFAULT_PASSWORD: '123123',
  JWT_SECRET: 'baozi',
  // resolve其实就是相当于在node 运行当前目录进行一些列文件cd 等命令操作,__dirname代表当前目录下
  UPLOAD_DIR: path.resolve(__dirname, '../upload'),
};