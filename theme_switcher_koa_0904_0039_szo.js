// 代码生成时间: 2025-09-04 00:39:27
const Koa = require('koa');
const Router = require('koa-router');

// 创建一个新的Koa实例
const app = new Koa();

// 创建一个新的Router实例
const router = new Router();

// 模拟主题数据存储
const themes = {
  light: {
    color: '#ffffff',
    background: '#000000',
  },
  dark: {
    color: '#000000',
    background: '#ffffff',
  },
};

// 获取当前主题的中间件
function getCurrentTheme(ctx, next) {
  // 假设主题存储在请求的cookie中
  const theme = ctx.cookies.get('theme', { signed: true });
  // 如果没有设置主题，则默认为'light'
  ctx.state.theme = themes[theme] || themes.light;
  return next();
}

// 设置主题的中间件
function setTheme(ctx, next) {
  const { theme } = ctx.request.body;
  if (!themes[theme]) {
    throw new Error('Invalid theme');
  }
  ctx.cookies.set('theme', theme, { signed: true, httpOnly: true });
  ctx.body = { message: `Theme set to ${theme}` };
  return next();
}

// 主题切换接口
router.post('/api/theme', setTheme);
router.get('/api/theme', getCurrentTheme, (ctx) => {
  ctx.body = ctx.state.theme;
});

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: err.message || 'Internal Server Error' };
  }
});

// 使用路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});