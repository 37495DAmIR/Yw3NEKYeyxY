// 代码生成时间: 2025-09-30 02:28:20
const Koa = require('koa');
const Router = require('koa-router');

// 创建一个Koa实例
const app = new Koa();
// 创建一个Router实例
const router = new Router();

// 测试数据生成器函数
function generateTestData() {
  // 随机生成测试数据
  const data = {
    id: Date.now(),
    name: `User${Math.floor(Math.random() * 1000)}`,
    email: `${Math.random().toString(36).substring(2, 15)}@example.com`,
    age: Math.floor(Math.random() * 50) + 20,
  };
  return data;
}

// 路由：生成测试数据
router.get('/generate-data', async (ctx) => {
  try {
    // 使用generateTestData函数生成测试数据
    const testData = generateTestData();
    // 设置响应状态码为200，并将测试数据作为JSON返回
    ctx.status = 200;
    ctx.body = { success: true, data: testData };
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = { success: false, message: 'Failed to generate test data', error: error.message };
  }
});

// 应用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 设置Koa监听端口3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});