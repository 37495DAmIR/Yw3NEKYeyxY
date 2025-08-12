// 代码生成时间: 2025-08-12 14:33:57
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建Koa实例
const app = new Koa();

// 初始化路由
const router = new Router();

// 假设的用户权限数据库
const userPermissions = {
  'user1': ['read', 'write'],
  'user2': ['read'],
  // 可以根据需要扩展更多用户和权限
};

// 解析请求体中间件
app.use(bodyParser());

// 获取用户权限
router.get('/permissions/:username', async (ctx) => {
  try {
    const { username } = ctx.params;
    const permissions = userPermissions[username];
    if (!permissions) {
      // 如果用户不存在，返回错误
      ctx.status = 404;
      ctx.body = {
        error: 'User not found',
      };
    } else {
      // 返回用户权限
      ctx.body = {
        permissions,
      };
    }
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = {
      error: 'Internal Server Error',
    };
  }
});

// 添加用户权限
router.post('/permissions/:username', async (ctx) => {
  try {
    const { username } = ctx.params;
    const { permissions } = ctx.request.body;
    if (!permissions || !Array.isArray(permissions)) {
      // 如果请求体不合法，返回错误
      ctx.status = 400;
      ctx.body = {
        error: 'Invalid permissions',
      };
    } else {
      // 添加或更新用户权限
      userPermissions[username] = permissions;
      ctx.body = {
        message: 'Permissions updated successfully',
      };
    }
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = {
      error: 'Internal Server Error',
    };
  }
});

// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});