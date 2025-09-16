// 代码生成时间: 2025-09-16 15:42:35
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');

// 定义一个函数来备份文件
function backupFile(sourcePath, backupPath) {
  try {
    const data = fs.readFileSync(sourcePath);
    fs.writeFileSync(backupPath, data);
    return { success: true, message: 'File backed up successfully' };
  } catch (error) {
    return { success: false, message: `Error backing up file: ${error.message}` };
  }
}

// 定义一个函数来同步文件夹
function syncFolders(sourceFolder, targetFolder) {
  try {
    fs.readdirSync(sourceFolder).forEach(file => {
      const sourceFile = path.join(sourceFolder, file);
      const targetFile = path.join(targetFolder, file);
      if (fs.statSync(sourceFile).isDirectory()) {
        syncFolders(sourceFile, targetFile);
      } else {
        fs.copyFileSync(sourceFile, targetFile);
      }
    });
    return { success: true, message: 'Folders synced successfully' };
  } catch (error) {
    return { success: false, message: `Error syncing folders: ${error.message}` };
  }
}

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 配置备份文件的路由
router.post('/backup', async (ctx) => {
  const { sourcePath, backupPath } = ctx.request.body;
  const result = backupFile(sourcePath, backupPath);
  ctx.body = result;
});

// 配置同步文件夹的路由
router.post('/sync', async (ctx) => {
  const { sourceFolder, targetFolder } = ctx.request.body;
  const result = syncFolders(sourceFolder, targetFolder);
  ctx.body = result;
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 服务器监听
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 以下是代码注释：
// - backupFile函数负责读取源文件并写入备份路径
// - syncFolders函数递归同步文件夹内容
// - Koa和Router用于创建RESTful API
// - /backup和/sync路由分别处理文件备份和文件夹同步请求
