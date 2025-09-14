// 代码生成时间: 2025-09-14 16:46:45
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建一个新的Koa实例
const app = new Koa();

// 创建一个Router实例
const router = new Router();

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 模拟数据库存储通知信息
let notifications = [];

// 获取所有通知
router.get('/notifications', async (ctx) => {
  try {
    ctx.body = {
      success: true,
      data: notifications
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to retrieve notifications'
    };
  }
});

// 发布新通知
router.post('/notifications', async (ctx) => {
  try {
    const { message } = ctx.request.body;
    if (!message) {
      ctx.status = 400;
      throw new Error('Message is required');
    }
    const newNotification = {
      id: Date.now(), // 使用时间戳作为ID
      message
    };
    notifications.push(newNotification);
    ctx.status = 201;
    ctx.body = {
      success: true,
      data: newNotification
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: error.message
    };
  }
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 启动Koa服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Notification system is running on port ${PORT}`);
});

// 代码注释：
// - 我们创建了一个Koa服务器，并使用Router来管理不同的路由。
// - 使用bodyParser中间件来解析POST请求的body数据。
// - 我们有一个简单的模拟数据库（数组notifications），用来存储通知信息。
// - 提供了一个GET接口来获取所有通知和一个POST接口来发布新通知。
// - 错误处理包括了捕获异常并返回适当的HTTP状态码和错误信息。