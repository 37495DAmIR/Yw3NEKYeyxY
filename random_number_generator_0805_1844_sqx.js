// 代码生成时间: 2025-08-05 18:44:09
 * @description This module provides a simple random number generator as a KOA endpoint.
 */

const Koa = require('koa');
const Router = require('koa-router');

// Create a new Koa instance
const app = new Koa();

// Create a new router
const router = new Router();

/**
 * Generates a random number between two values (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number between min and max
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Route to generate a random number
 * @param {object} ctx - KOA context
 */
router.get('/random', async (ctx) => {
  try {
    // Define the range for the random number generator
    const min = ctx.query.min || 1; // Default minimum is 1
    const max = ctx.query.max || 100; // Default maximum is 100
    
    // Validate input
    if (isNaN(min) || isNaN(max) || min > max) {
      ctx.status = 400;
      ctx.body = {
        error: 'Invalid input. Please provide valid numbers and min should be less than or equal to max.'
      };
    } else {
      // Generate and return a random number
      const randomNumber = getRandomNumber(min, max);
      ctx.body = {
        randomNumber: randomNumber
      };
    }
  } catch (error) {
    // Handle any unexpected errors
    ctx.status = 500;
    ctx.body = {
      error: 'An unexpected error occurred while generating the random number.'
    };
  }
});

// Use the router
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Random Number Generator server is running on port ${PORT}`);
});