// 代码生成时间: 2025-08-14 17:22:34
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken'); // 引入jsonwebtoken处理JWT

// 配置常量
const SECRET_KEY = 'your_secret_key'; // 用于JWT签名的密钥
const TOKEN_EXPIRATION = '1h'; // 令牌过期时间

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 错误处理
    ctx.status = err.statusCode || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

// JWT验证中间件
const authenticate = async (ctx, next) => {
  const token = ctx.get('Authorization');
  if (!token) {
    ctx.throw(401, 'Authentication token is required');
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.throw(401, 'Invalid token');
  }
};

// 受保护的路由
router.get('/protected', authenticate, async (ctx) => {
  // 只有验证通过的用户才能访问这个路由
  ctx.body = {
    message: 'This is a protected route. Access granted.',
    user: ctx.state.user,
  };
});

// 未受保护的路由
router.get('/', async (ctx) => {
  ctx.body = {
    message: 'This is a public route. Access granted.',
  };
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 代码注释说明：
// 1. 引入Koa框架和Router中间件，用于处理路由。
// 2. 使用jsonwebtoken处理JWT，用于用户认证。
// 3. 设置JWT使用的密钥和令牌过期时间。
// 4. 创建Koa实例和Router实例。
// 5. 添加错误处理中间件，捕获并处理请求过程中的错误。
// 6. 实现JWT验证中间件，检查请求中的Authorization头。
// 7. 定义受保护的路由和未受保护的路由。
// 8. 应用路由中间件，启动服务器。