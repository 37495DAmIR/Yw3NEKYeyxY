// 代码生成时间: 2025-09-08 00:47:12
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 用户权限管理系统
const app = new Koa();
const router = new Router();

// Mock 数据库，存储用户信息和权限
const users = {
  'user1': {
    name: 'user1',
    permissions: ['read', 'write']
  },
  'user2': {
    name: 'user2',
    permissions: ['read']
  },
};

// 解析请求体
app.use(bodyParser());

// 获取用户权限
router.get('/users/:username/permissions', async (ctx) => {
  const { username } = ctx.params;
  if (!users[username]) {
    return ctx.status = 404;
  }
  ctx.body = users[username].permissions;
});

// 更新用户权限
router.post('/users/:username/permissions', async (ctx) => {
  const { username } = ctx.params;
  const newPermissions = ctx.request.body.permissions;
  if (!username || !newPermissions) {
    return ctx.status = 400;
  }
  if (!users[username]) {
    return ctx.status = 404;
  }
  users[username].permissions = newPermissions;
  ctx.body = {
    message: 'User permissions updated successfully',
    permissions: newPermissions
  };
});

// 添加路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 注释：
// 该程序使用KOA框架创建了一个简单的用户权限管理系统。
// 它包含两个路由：一个用于获取用户权限，另一个用于更新用户权限。
// 程序使用Mock的数据库（对象）来存储用户信息和权限。
// 每个路由都包含了基本的错误处理，例如检查用户名是否存在。
// 代码遵循JS最佳实践，结构清晰，易于理解。