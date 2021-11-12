const getBody = (ctx) => {
    return ctx.request.body || {};  //如果没有就返回去一个空对象
}

module.exports = {  //导出方法
    getBody,
};