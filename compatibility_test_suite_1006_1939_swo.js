// 代码生成时间: 2025-10-06 19:39:51
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// Middleware to handle JSON body parsing
app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.status = 200;
    ctx.body = {
      success: false,
      message: 'Resource not found'
    };
  }
});

// Compatibility test endpoint
router.get('/test', async (ctx) => {
  // Mock compatibility test data
  const compatibilityData = {
    'featureA': true,
    'featureB': false
  };

  // Check for optional query parameters
  const { feature } = ctx.query;

  // Error handling
  if (feature && !compatibilityData.hasOwnProperty(feature)) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: 'Invalid feature specified'
    };
    return;
  }

  // Return compatibility data or specific feature test result
  ctx.body = feature ? compatibilityData[feature] : compatibilityData;
});

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // Log error and send error response
    console.error(err);
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      message: err.message || 'Internal Server Error'
    };
  }
});

// Register all routes with the application
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});