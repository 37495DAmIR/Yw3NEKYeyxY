// 代码生成时间: 2025-08-07 15:53:35
 * Features:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 *
 * Notes:
 * - Error handling is included for each operation
 * - The code is designed to be clear and maintainable
 */

const Koa = require('koa');
const Router = require('koa-router');

// Initialize a new Koa application
const app = new Koa();
const router = new Router();

// Math calculator middleware
router.post('/calculate', async (ctx) => {
  const { operation, num1, num2 } = ctx.request.body;
  
  // Error handling for missing parameters
  if (!operation || !num1 || !num2) {
    ctx.status = 400;
    ctx.body = {
      error: 'Missing parameters'
    };
    return;
  }
  
  let result;
  try {
    if (operation === 'add') {
      result = add(num1, num2);
    } else if (operation === 'subtract') {
      result = subtract(num1, num2);
    } else if (operation === 'multiply') {
      result = multiply(num1, num2);
    } else if (operation === 'divide') {
      result = divide(num1, num2);
    } else {
      throw new Error('Invalid operation');
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message
    };
    return;
  }
  
  ctx.status = 200;
  ctx.body = {
    result: result
  };
});

// Helper functions for each mathematical operation
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// Use the router
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Math calculator server running on port ${PORT}`);
});