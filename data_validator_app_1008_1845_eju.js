// 代码生成时间: 2025-10-08 18:45:45
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建一个新的Koa实例
const app = new Koa();
// 创建一个新的Router实例
const router = new Router();

// 数据验证器，用于校验请求体中的数据
function validateData(data) {
  // 假设我们需要验证的数据格式是：{ name: String, age: Number }
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid name type');
  }
  if (!data.age || typeof data.age !== 'number') {
    throw new Error('Invalid age type');
  }
}

// 定义一个POST路由，用于接收数据并进行验证
router.post('/validate', async (ctx) => {
  try {
    // 使用bodyParser中间件解析请求体
    await bodyParser()(ctx);
    // 验证请求体中的数据
    validateData(ctx.request.body);
    // 如果数据验证通过，则返回成功响应
    ctx.body = {
      message: 'Data is valid',
      data: ctx.request.body
    };
  } catch (error) {
    // 如果数据验证失败，则返回错误响应
    ctx.status = 400;
    ctx.body = {
      error: error.message
    };
  }
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 设置监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});