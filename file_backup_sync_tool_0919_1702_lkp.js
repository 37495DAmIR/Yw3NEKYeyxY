// 代码生成时间: 2025-09-19 17:02:36
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const util = require('util');

// 使用promisify包装fs的函数以支持Promise
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);
const ensureDir = promisify(fs.mkdir);

const app = new Koa();

// 健康检查端点
app.use(async ctx => {
  ctx.body = 'File Backup and Sync Tool is running.';
});

// 文件备份和同步的端点
app.use(async ctx => {
  if (ctx.path === '/backup-sync' && ctx.method === 'POST') {
    try {
      // 获取请求体中的源目录和目标目录
      const { sourceDir, targetDir } = ctx.request.body;
      
      // 确保源目录和目标目录有效
      const sourceStats = await stat(sourceDir);
      if (!sourceStats.isDirectory()) {
        throw new Error('Source directory does not exist or is not a directory.');
      }
      
      const targetStats = await stat(targetDir);
      if (!targetStats) {
        // 如果目标目录不存在，则创建它
        await ensureDir(targetDir);
      } else if (!targetStats.isDirectory()) {
        throw new Error('Target path exists and is not a directory.');
      }
      
      // 递归备份和同步文件
      await syncFolders(sourceDir, targetDir);
      ctx.status = 200;
      ctx.body = 'Backup and sync completed successfully.';
    } catch (error) {
      ctx.status = 500;
      ctx.body = error.message;
    }
  }
});

// 递归同步文件夹
async function syncFolders(source, target) {
  const entries = await readdir(source);
  for (let entry of entries) {
    const sourcePath = path.join(source, entry);
    const targetPath = path.join(target, entry);
    const stats = await stat(sourcePath);
    
    if (stats.isDirectory()) {
      // 如果是目录，则递归同步
      await ensureDir(targetPath);
      await syncFolders(sourcePath, targetPath);
    } else {
      // 如果是文件，则复制文件
      await copyFile(sourcePath, targetPath);
    }
  }
}

// 监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 模块化导出
module.exports = app;