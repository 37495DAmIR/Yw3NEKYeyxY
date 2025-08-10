// 代码生成时间: 2025-08-11 01:54:56
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const request = require('supertest');
const assert = require('assert');

// Initialize Koa app
const app = new Koa();
const router = new Router();

// Middleware to parse request bodies
app.use(bodyParser());

// Define test routes
router.get('/hello', (ctx) => {
  ctx.body = 'Hello World';
});

// Register routes
app.use(router.routes());
app.use(router.allowedMethods());

// Setup test cases
describe('Automation Test Suite', () => {
  it('should respond to GET /hello', (done) => {
    request(app.callback())
      .get('/hello')
      .expect('Hello World')
      .end((err, res) => {
        if (err) throw err;
        assert.strictEqual(res.text, 'Hello World');
        done();
      });
  });
});

// Export the app for testing
module.exports = app;