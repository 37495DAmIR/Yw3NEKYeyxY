// 代码生成时间: 2025-08-23 04:57:12
const Koa = require('koa');
const Router = require('koa-router');

// Create a new Koa application
const app = new Koa();
const router = new Router();

// Define mathematical operations
const mathOperations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : 'Error: Division by zero',
};

// Define endpoints for different operations
router.get('/add/:a/:b', (ctx) => {
  const { a, b } = ctx.params;
  const result = mathOperations.add(Number(a), Number(b));
  ctx.body = { result };
});

router.get('/subtract/:a/:b', (ctx) => {
  const { a, b } = ctx.params;
  const result = mathOperations.subtract(Number(a), Number(b));
  ctx.body = { result };
});

router.get('/multiply/:a/:b', (ctx) => {
  const { a, b } = ctx.params;
  const result = mathOperations.multiply(Number(a), Number(b));
  ctx.body = { result };
});

router.get('/divide/:a/:b', async (ctx) => {
  const { a, b } = ctx.params;
  try {
    const result = mathOperations.divide(Number(a), Number(b));
    ctx.body = { result };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// Add the router middleware to the application
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Math toolbox server running on port ${PORT}`);
});
