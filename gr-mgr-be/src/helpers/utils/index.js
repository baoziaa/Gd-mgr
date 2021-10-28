const getYearByTimeStamp = (ts) => {
  const date = new Date(ts);

  return date.getFullYear();
}

const getDateByTimeStamp = (ts) => {
  const date = new Date(ts);

  return date.getDate();
}

module.exports = {  //导出两个对象对应两个方法
  getYearByTimeStamp,
  getDateByTimeStamp,
};