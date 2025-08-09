// 代码生成时间: 2025-08-09 20:25:42
const Koa = require('koa');
const Router = require('koa-router');

// Initialize the Koa application
const app = new Koa();
const router = new Router();

// Middleware to handle body parsing
app.use(async (ctx, next) => {
  await next();
  ctx.body = { status: 'success', data: ctx.body };
});

// Theme switcher state
let currentTheme = 'light';

// Route to switch theme
router.post('/switch-theme', async (ctx) => {
  const { theme } = ctx.request.body;
  if (!theme) {
    // If theme is not provided, return an error
    ctx.status = 400;
    ctx.body = { status: 'error', message: 'Theme parameter is required' };
    return;
  }

  // Validate the theme
  if (theme !== 'light' && theme !== 'dark') {
    ctx.status = 400;
    ctx.body = { status: 'error', message: 'Invalid theme value' };
    return;
  }

  // Switch the theme
  currentTheme = theme;
  ctx.status = 200;
  ctx.body = { status: 'success', message: 'Theme switched to ' + theme, currentTheme };
});

// Add routes to the application
app.use(router.routes()).use(router.allowedMethods());

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Export the current theme for further use
module.exports = { currentTheme };
