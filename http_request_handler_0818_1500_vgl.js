// 代码生成时间: 2025-08-18 15:00:18
const Koa = require('koa');
const app = new Koa();

// 引入中间件处理请求日志
const logger = require('koa-logger');
// 引入中间件处理静态文件服务
const serve = require('koa-static');

// 中间件：记录请求日志
app.use(logger());

// 中间件：提供静态文件服务
app.use(serve('.')); // 服务当前目录下的静态文件

// 路由：处理根路径GET请求
app.use(async ctx => {
  if (ctx.path === '/' && ctx.method === 'GET') {
    // 简单的响应文本
    ctx.body = 'Welcome to the HTTP Request Handler!';
  } else {
    // 如果请求的路径不是根路径，返回404错误
    ctx.status = 404;
    ctx.body = 'Not Found';
  }
});

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    console.error('Server Error', err);
  }
});

// 监听3000端口
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});