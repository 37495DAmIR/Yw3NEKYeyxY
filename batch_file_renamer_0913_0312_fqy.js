// 代码生成时间: 2025-09-13 03:12:24
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 文件重命名函数
async function renameFiles(dirPath, renamingStrategy) {
  const files = fs.readdirSync(dirPath);
  for (const filename of files) {
    const oldPath = path.join(dirPath, filename);
    const stats = fs.statSync(oldPath);
    if (stats.isFile()) {
      const newName = renamingStrategy(filename);
      const newPath = path.join(dirPath, newName);
      fs.renameSync(oldPath, newPath);
    }
  }
}

// 获取重命名模式，这里是一个简单的示例，可以根据需要进行修改
function getRenamingStrategy() {
  // 这里可以添加复杂的逻辑，比如根据文件类型、日期等进行重命名
  let index = 0;
  return (filename) => {
    index++;
    return `file_${index}_${filename}`;
  };
}

// API接口，提交重命名请求
router.post('/rename', async (ctx) => {
  const { dirPath } = ctx.request.body;
  try {
    if (!dirPath) {
      throw new Error('Directory path is required');
    }
    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
      throw new Error('Provided path is not a directory');
    }
    const renamingStrategy = getRenamingStrategy();
    await renameFiles(dirPath, renamingStrategy);
    ctx.body = {
      status: 'success',
      message: 'Files have been renamed successfully'
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: error.message
    };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动Koa服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 文档说明：
// 这个程序是一个简单的批量文件重命名工具，使用Koa框架创建RESTful API。
// 用户可以通过发送POST请求到/rename端点，并在请求体中包含目录路径，来触发文件重命名操作。
// 重命名策略目前是简单的编号+原文件名。可以根据需要扩展或修改重命名策略。