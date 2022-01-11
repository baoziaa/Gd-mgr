// 每个文件都是一个模块
const Koa = require('koa');
const koaBody = require('koa-body');
const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');//引入routers里面的index.js,index.js可以省略,它会自己去找(routers文件下的index.js导出,我就可以引入)
const cors = require('@koa/cors');  //解决跨域问题

// const Router = require('@koa/router');
// const utils = require('./helpers/utils/index')

// console.log(utils.getYearByTimestamp);

// console.log(getYearByTimeStamp(new Date().getTime()));

const app = new Koa();

connect().then(() => {
  app.use(cors());  //处理跨域的一个中间件
  app.use(koaBody()); //它是一个函数,要放在registerRoutes之前,因为每个router触发的时候都要处理好Body请求体上面的信息(如上传文件大小,支不支持上传多个文件)
  
  registerRoutes(app);  //调用一下这个函数
  // 开启一个 http 服务
  //接受 http 请求 并处理,处理完后响应  3000代表的监听端口,浏览器默认端口80,https默认端口443  例:https://www.imooc.com:443
  app.listen(3000,() => {
    console.log('启动成功!');
});
});
/* 
const authRouter = new Router({
  prefix: '/auth',  //prefix表示前缀,通过前缀去区分这个router这个业务逻辑是属于哪一块的
});

const inforRouter = new Router({
  prefix: '/info',  //prefix表示前缀,通过前缀去区分这个router这个业务逻辑是属于哪一块的
});

//router.get方式可以通过浏览器去访问,浏览器的地址敲进去默认就是get方法去发送的
authRouter.get('/register', async (ctx) => {  //ctx是context的缩写
  ctx.body = '注册成功';
});

inforRouter.get('/add', async (ctx) => {  //ctx是context的缩写
  ctx.body = '添加成功';
});

app.use(authRouter.routes()); //注册一下中间件
app.use(inforRouter.routes()); //注册一下中间件
 */
/* 
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
 */
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

// console.log("baohaidong")


// nodejs默认使用的模块化方案是commonjs(例:用到require或module.export),在比较新版的nodejs中,
//可以通过package.json中的Model字段也可一让她支持ES  Modules(ES6模块化的一个规范)

