// 代码生成时间: 2025-08-18 01:45:53
const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');

// Define a new Koa application
const app = new Koa();
const router = new Router();

// Middleware to validate URL
async function validateUrl(ctx) {
  // Extract the URL from the request query
  const { url } = ctx.query;

  // Check if URL is provided and is a valid string
  if (!url) {
    ctx.status = 400;
    ctx.body = {
      error: 'URL parameter is missing or invalid.'
    };
    return;
  }

  try {
    // Use axios to make a HEAD request to check URL validity
    const response = await axios.head(url, {
      timeout: 5000,
      maxContentLength: 10 * 1024 * 1024
    });
    
    // Check if the URL is reachable and has a successful status code
    if (response.status >= 200 && response.status < 300) {
      ctx.status = 200;
      ctx.body = {
        valid: true,
        message: 'URL is valid and reachable.'
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        valid: false,
        message: 'URL is not valid or not reachable.'
      };
    }
  } catch (error) {
    // Handle any errors that occur during the validation process
    ctx.status = 500;
    ctx.body = {
      error: 'Error occurred while validating URL.',
      details: error.message
    };
  }
}

// Define the route for URL validation
router.get('/validate-url', validateUrl);

// Use the router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start the Koa server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`URL Validator Service is running on http://localhost:${port}`);
});
