// 代码生成时间: 2025-09-22 23:45:52
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');

// 创建一个Koa应用
const app = new Koa();
const router = new Router();

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

// 批量文件重命名函数
async function batchRenameFiles(directory, renamePattern) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const oldPath = path.join(directory, file);
    const stats = fs.statSync(oldPath);
    if (stats.isFile()) {
      const newName = renamePattern.replace(/\{originalName\}/g, file);
      const newPath = path.join(directory, newName);
      fs.renameSync(oldPath, newPath);
    }
  }
}

// 设置重命名规则的路由
router.post('/rename', async (ctx) => {
  const { directory, renamePattern } = ctx.request.body;
  
  // 检查输入参数
  if (!directory || !renamePattern) {
    ctx.status = 400;
    ctx.body = { error: 'Directory and rename pattern are required.' };
    return;
  }

  try {
    // 执行批量重命名
    await batchRenameFiles(directory, renamePattern);
    ctx.body = {
      message: 'Files have been successfully renamed.'
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error occurred during file renaming.' };
  }
});

// 将路由应用到Koa应用
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 注释说明：
// 此程序使用Koa框架创建了一个简单的批量文件重命名工具。
// 用户可以通过POST请求到/rename端点，并提供目录和重命名模式。
// 程序会读取指定目录下的所有文件，并按照提供的模式重命名。
// 错误处理中间件确保任何异常都能被捕捉并返回给客户端。
// 此代码遵循JS最佳实践，结构清晰，易于理解和扩展。