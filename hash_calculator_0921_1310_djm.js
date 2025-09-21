// 代码生成时间: 2025-09-21 13:10:23
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const crypto = require('crypto');

// Initialize Koa application
const app = new Koa();

// Error handler middleware
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
    }
});

// Body parser middleware
app.use(bodyParser());

// Route to calculate hash
app.use(async ctx => {
    // Check if the request method is POST
    if (ctx.method === 'POST' && ctx.path === '/calculate-hash') {
        // Get the string to be hashed from the request body
        const { text } = ctx.request.body;
        
        if (!text) {
            ctx.status = 400;
            ctx.body = { message: 'No text provided for hashing' };
            return;
        }
        
        // Calculate the SHA-256 hash of the provided text
        const hash = crypto.createHash('sha256').update(text).digest('hex');
        
        // Send back the hash as the response
        ctx.status = 200;
        ctx.body = { hash };
    } else {
        // If the endpoint is not matched, return 404
        ctx.status = 404;
        ctx.body = { message: 'Endpoint not found' };
    }
});

// Start the Koa server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Hash Calculator Service is running on port ${PORT}`);
});