// 代码生成时间: 2025-09-18 07:20:32
const Koa = require('koa');
const Router = require('koa-router');

// Create a new Koa application
const app = new Koa();
const router = new Router();

// Mock database for storing messages
const messages = [];

// Middleware to handle CORS
app.use(async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
});

// POST endpoint to create a message
router.post('/messages', async (ctx) => {
  try {
    // Check if the body has the required structure
    const { title, content } = ctx.request.body;
    if (!title || !content) {
      throw new Error('Title and content are required');
    }
    
    // Create a new message object
    const message = {
      id: Date.now(),
      title,
      content,
      timestamp: new Date().toISOString()
    };
    
    // Add the message to the mock database
    messages.push(message);
    
    // Respond with the created message
    ctx.status = 201;
    ctx.body = message;
  } catch (error) {
    // Handle any errors that occur during message creation
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// GET endpoint to retrieve all messages
router.get('/messages', async (ctx) => {
  ctx.body = messages;
});

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

// Apply the router middleware to the application
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Message Notification System running on port ${PORT}`);
});

// Module exports for testing
module.exports = app;