// 代码生成时间: 2025-09-19 11:22:04
 * @author [Your Name]
 * @version 1.0
 */

const Koa = require('koa');
const Router = require('koa-router');
const crypto = require('crypto');

// Create a new Koa instance
const app = new Koa();
// Create a new Router instance
const router = new Router();

// Middleware to handle the hash calculation request
router.post('/hash', async (ctx) => {
  // Get data from the request body
  const data = ctx.request.body.data;

  // Check if data is provided
  if (!data) {
    ctx.status = 400;
    ctx.body = { error: 'No data provided' };
    return;
  }

  // Calculate the hash (using SHA-256 as an example)
  const hash = crypto.createHash('sha256').update(data, 'utf8').digest('hex');

  // Send back the calculated hash
  ctx.body = { hash };
});

// Use the router middleware
app.use(router.routes()).use(router.allowedMethods());

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hash Calculator App listening on port ${PORT}`);
});