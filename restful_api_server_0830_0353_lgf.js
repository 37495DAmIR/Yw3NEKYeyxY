// 代码生成时间: 2025-08-30 03:53:53
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// Define a data structure to simulate a database
const users = [];

// Middleware to parse JSON bodies
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'json';
  ctx.body = {
    code: ctx.status,
    message: 'success'
  };
});

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      code: ctx.status,
      message: err.message,
      error: err,
    };
  }
});

// GET /users - List all users
router.get('/users', async (ctx) => {
  ctx.body = users;
});

// POST /users - Create a new user
router.post('/users', async (ctx) => {
  const { username, email } = ctx.request.body;
  if (!username || !email) {
    ctx.status = 400; // Bad Request
    ctx.body = {
      code: 400,
      message: 'Missing username or email'
    };
    return;
  }
  const newUser = { username, email, id: users.length + 1 };
  users.push(newUser);
  ctx.status = 201; // Created
  ctx.body = newUser;
});

// PUT /users/:id - Update a user
router.put('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const { username, email } = ctx.request.body;
  const user = users.find(u => u.id.toString() === id);
  if (!user) {
    ctx.status = 404; // Not Found
    ctx.body = {
      code: 404,
      message: 'User not found'
    };
    return;
  }
  if (username) user.username = username;
  if (email) user.email = email;
  ctx.body = user;
});

// DELETE /users/:id - Delete a user
router.del('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const index = users.findIndex(u => u.id.toString() === id);
  if (index === -1) {
    ctx.status = 404; // Not Found
    ctx.body = {
      code: 404,
      message: 'User not found'
    };
    return;
  }
  users.splice(index, 1);
  ctx.status = 204; // No Content
  ctx.body = null;
});

// Apply the routes to the app
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});