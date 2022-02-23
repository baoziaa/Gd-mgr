const xlsx = require('node-xlsx');

// 读取Excel文件
const loadExcel = (path) => {
  return xlsx.parse(path);
};
// 传入Excel文件拿到第一个sheet数据
const getFirstSheet = (sheets) => {
  return sheets[0].data;
};

module.exports = {
  loadExcel,
  getFirstSheet,
};

// 选择一个文件上传
// 服务端得到文件的key
// 前端再请求对应的业务