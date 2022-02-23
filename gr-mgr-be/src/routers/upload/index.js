const Router = require('@koa/router');  //引入@koa/router
const mongoose = require('mongoose'); //引入mongoose,拿到对应的Usermodel
const config = require('../../project.config');
const { saveFileToDisk, getUploadFileExt } = require('../../helpers/upload');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// const { getBody } = require('../../helpers/utils');

const Log = mongoose.model('Log');//对应的Usermodel

const router = new Router({ //实例化
  prefix: '/upload',  //路由前缀
});

router.post('/file', async (ctx) => {
  // 拿到后缀名
  const ext = getUploadFileExt(ctx);
  // 文件名uuid生成+拼接后缀名
  const filename = `${uuidv4()}.${ext}`;
  // 保存到磁盘
  await saveFileToDisk(ctx, path.resolve(config.UPLOAD_DIR, filename));

  ctx.body = {
    data: filename,
    msg: '上传成功',
    code: 1,
  };
  
});



module.exports = router;  //导出这个路由

