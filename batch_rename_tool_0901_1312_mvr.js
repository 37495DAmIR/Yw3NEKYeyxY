// 代码生成时间: 2025-09-01 13:12:41
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

// 创建一个Koa应用实例
const app = new Koa();
const router = new Router();

// 批量重命名文件函数
async function batchRenameFiles(files, renamePattern) {
  for (let file of files) {
    try {
      // 构建新文件名
      const newFileName = renamePattern.replace('{{original}}', file);
      // 检查新文件名是否唯一
      const newFilePath = path.join(path.dirname(file), newFileName);
      if (fs.existsSync(newFilePath)) {
        throw new Error(`File already exists: ${newFileName}`);
      }
      // 重命名文件
      fs.renameSync(file, newFilePath);
      console.log(`Renamed ${file} to ${newFileName}`);
    } catch (error) {
      console.error(`Error renaming ${file}: ${error.message}`);
    }
  }
}

// POST路由，接收文件名和重命名模式
router.post('rename', async (ctx) => {
  const { files, renamePattern } = ctx.request.body;
  // 参数校验
  if (!files || !renamePattern) {
    ctx.status = 400;
    ctx.body = { error: 'Missing files or rename pattern' };
    return;
  }
  if (!Array.isArray(files)) {
    ctx.status = 400;
    ctx.body = { error: 'Files must be an array' };
    return;
  }
  // 执行批量重命名
  await batchRenameFiles(files, renamePattern);
  ctx.body = { message: 'Files renamed successfully' };
});

// 将路由应用到Koa应用
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 注意：此代码示例仅为演示用途，实际部署时需要考虑安全性、错误处理、输入验证等更多因素。