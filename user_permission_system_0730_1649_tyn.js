// 代码生成时间: 2025-07-30 16:49:56
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建一个Koa实例
const app = new Koa();
const router = new Router();

// 数据库模拟（在实际应用中应替换为真实的数据库操作）
const users = {
  'user1': {
    id: 'user1',
    name: 'John Doe',
    permissions: ['read', 'write']
  },
  'user2': {
    id: 'user2',
    name: 'Jane Doe',
    permissions: ['read']
  }
};

// 中间件用于解析请求体
app.use(bodyParser());

// 获取用户权限
router.get('/users/:id/permissions', async (ctx) => {
  const { id } = ctx.params;
  if (users[id]) {
    ctx.body = {
      status: 'success',
      data: users[id].permissions
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'User not found'
    };
  }
});

// 添加用户权限
router.post('/users/:id/permissions', async (ctx) => {
  const { id } = ctx.params;
  const { permission } = ctx.request.body;
  if (users[id]) {
    users[id].permissions.push(permission);
    ctx.body = {
      status: 'success',
      message: 'Permission added',
      data: users[id].permissions
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'User not found'
    };
  }
});

// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());

// 错误处理中间件
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 代码注释
// 这个程序是一个简单的用户权限管理系统。
// 它提供了两个API端点：
// 1. 获取指定用户的权限列表。
// 2. 为指定用户添加新的权限。
// 请注意，这里的用户数据和权限是硬编码的，
// 在实际应用中，你需要使用数据库来存储这些信息。
// 该程序还包括基本的错误处理。