// 代码生成时间: 2025-08-13 09:16:31
 * It includes error handling, comments, and follows JS best practices for maintainability and scalability.
 */

const Koa = require('koa');
const Router = require('koa-router');

// Define a simple data model
const users = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

// Initialize the Koa application
const app = new Koa();
const router = new Router();

// Middleware to handle JSON parsing
app.use(async (ctx, next) => {
  await next();
  // Error handling middleware
  if (ctx.status === 404) {
    ctx.body = { error: 'Not Found' };
  } else if (ctx.status === 500) {
    ctx.body = { error: 'Internal Server Error' };
  }
});

// GET /users - Retrieve all users
router.get('/users', async (ctx) => {
  ctx.body = users;
});

// GET /users/:id - Retrieve a single user by ID
router.get('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
});

// POST /users - Create a new user
router.post('/users', async (ctx) => {
  const { name, age } = ctx.request.body;
  const newUser = { id: users.length + 1, name, age };
  users.push(newUser);
  ctx.body = newUser;
});

// DELETE /users/:id - Delete a user by ID
router.del('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index > -1) {
    users.splice(index, 1);
    ctx.status = 204; // No Content
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
});

// Use the router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});