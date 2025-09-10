// 代码生成时间: 2025-09-10 19:37:58
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// Create a new Koa instance
const app = new Koa();

// Create a new router
const router = new Router();

// Use body parser middleware to parse incoming request bodies
app.use(bodyParser());

// Define a simple GET route
router.get('/', async (ctx) => {
  // Respond with a simple greeting
  ctx.body = 'Hello, world!';
});

// Define a POST route to handle JSON data
router.post('/api/data', async (ctx) => {
  // Check if the request body has data
  if (!ctx.request.body) {
    ctx.status = 400;
    ctx.body = 'No data provided';
    return;
  }
  
  // Log the received data
  console.log('Received data:', ctx.request.body);
  
  // Respond with the received data
  ctx.body = ctx.request.body;
});

// Handle 404 errors - page not found
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = 'Page not found';
});

// Handle 500 errors - internal server errors
app.on('error', (err, ctx) => {
  // Log the error
  console.error('Server error:', err);
  
  // Respond with a generic error message
  ctx.status = err.status || 500;
  ctx.body = 'Internal Server Error';
});

// Use the router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});