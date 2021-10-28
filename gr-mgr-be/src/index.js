// 每个文件都是一个模块
const Koa = require('koa');

const utils = require('./helpers/utils/index')

// console.log(utils);

// console.log(getYearByTimeStamp(new Date().getTime()));

const app = new Koa();

app.use(async (context,next) => {
  // 对象的结构
  const { request : req } = context;
  const { url } = req;
  console.log(2);
  await next();
  console.log(1);

  if(url === '/user'){
    context.body = '<h1>abcde</h1>'
    
    return; //当前函数执行结束了
  }

  context.body = '??';
});

app.use(async (context) => {
  console.log(3)
  context.body = '找不到资源';
});

/* app.use((ctx) => {  //中间件,每次请求进来,中间键都会被执行一次  //context缩写ctx
  const { path = '/' } = ctx;

  if(path === '/'){
    ctx.body = '这是根目录';
  }

  if(path === '/user/123'){
    ctx.body = '返回用户123的信息';
  }

  if(path === '/setting'){
    ctx.body = '返回有关设置的内容';
  }
}); */

console.log(123)
// 开启一个 http 服务
//接受 http 请求 并处理,处理完后响应  3000代表的监听端口,浏览器默认端口80,https默认端口443  例:https://www.imooc.com:443
app.listen(3000,() => {
  console.log('启动成功!')
});

// nodejs默认使用的模块化方案是commonjs(例:用到require或module.export),在比较新版的nodejs中,
//可以通过package.json中的Model字段也可一让她支持ES  Modules(ES6模块化的一个规范)

