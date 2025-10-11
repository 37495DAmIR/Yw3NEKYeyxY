// 代码生成时间: 2025-10-11 22:56:42
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 模拟用户数据库
const users = {
  'user1': { password: 'password1' },
  'user2': { password: 'password2' }
};

// 登录路由
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  // 检查用户名和密码是否存在
  if (!users[username] || users[username].password !== password) {
    ctx.status = 401; // 未授权
    ctx.body = { error: 'Invalid username or password' };
    return;
  }
  // 如果验证成功，返回成功的响应
  ctx.status = 200;
  ctx.body = { message: 'Login successful' };
});

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 使用路由器
app.use(router.routes()).use(router.allowedMethods());

// 定义端口并启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// 代码注释
// 以上代码创建了一个简单的KOA服务器，包含一个登录验证的路由。
// 用户通过POST请求发送用户名和密码，服务器将验证这些信息。
// 如果验证失败，服务器将返回401状态码和错误信息。
// 如果验证成功，服务器将返回200状态码和成功信息。
// 这个系统使用了模拟的用户数据库，实际应用中应该使用真实的数据库。