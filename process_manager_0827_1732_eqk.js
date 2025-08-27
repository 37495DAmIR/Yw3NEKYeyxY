// 代码生成时间: 2025-08-27 17:32:56
const Koa = require('koa');
const Router = require('koa-router');
const { exec } = require('child_process');

// 创建一个新的Koa实例
const app = new Koa();

// 创建路由
const router = new Router();

// 启动进程
router.get('/start', async (ctx) => {
  const { command } = ctx.query;
  if (!command) {
    ctx.status = 400;
    ctx.body = 'Missing command parameter';
    return;
  }
  try {
    const subprocess = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    ctx.body = `Process started with command: ${command}`;
  } catch (error) {
    ctx.status = 500;
    ctx.body = `Failed to start process: ${error.message}`;
  }
});

// 查看所有进程
router.get('/list', async (ctx) => {
  try {
    const processes = await new Promise((resolve, reject) => {
      exec('ps aux', (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
    ctx.body = { processes };
  } catch (error) {
    ctx.status = 500;
    ctx.body = `Failed to list processes: ${error.message}`;
  }
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 定义监听的端口
const PORT = process.env.PORT || 3000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});