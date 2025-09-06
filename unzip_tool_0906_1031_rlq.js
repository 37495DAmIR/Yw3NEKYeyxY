// 代码生成时间: 2025-09-06 10:31:23
const Koa = require('koa');
const Router = require('koa-router');
const unzipper = require('unzipper');
const path = require('path');
const fs = require('fs').promises;

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 定义路由
router.post('/unzip', async (ctx) => {
  // 检查是否有文件被上传
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.status = 400;
    ctx.body = 'No file uploaded';
    return;
  }

  // 获取上传的文件
  const file = ctx.request.files.file;
  const targetPath = path.join(__dirname, 'uploads', file.name);

  try {
    // 保存上传的文件
    await fs.writeFile(targetPath, file.data);

    // 解压文件
    await fs.createReadStream(targetPath)
      .pipe(unzipper.Extract({ path: path.join(__dirname, 'extracted') }));

    // 删除上传的文件
    await fs.unlink(targetPath);

    ctx.status = 200;
    ctx.body = 'File successfully unzipped';
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = 'Error unzipping file: ' + error.message;
  }
});

// 静态文件服务
app.use(router.routes()).use(router.allowedMethods());
app.use(require('koa-static')(path.join(__dirname, 'public')));

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 注释：
// 这个脚本创建了一个基于Koa的简单文件解压工具。
// 它接受一个POST请求，上传文件，并将其解压到指定目录。
// 它还提供静态文件服务，用于访问解压后的文件。
// 代码遵循JS最佳实践，结构清晰，易于维护和扩展。