// 代码生成时间: 2025-08-22 23:10:44
const Koa = require('koa');
const Router = require('koa-router');

// 创建Koa实例
const app = new Koa();

// 使用Router模块创建路由
const router = new Router();

// 定义生成随机数的函数
function generateRandomNumber(min, max) {
  // 确保min和max是有效的
  if (min > max) {
    throw new Error('min cannot be greater than max');
  }
  // 返回一个随机数
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 定义一个路由处理函数，生成一个随机数
router.get('/random-number', async (ctx) => {
  try {
    // 从查询参数中获取min和max
    const { min, max } = ctx.query;
    // 将字符串类型的查询参数转换为数字
    const minVal = parseInt(min, 10);
    const maxVal = parseInt(max, 10);
    // 检查参数是否有效
    if (isNaN(minVal) || isNaN(maxVal) || minVal > maxVal) {
      ctx.status = 400;
      ctx.body = {
        error: 'Invalid parameters. Please provide valid min and max values.'
      };
    } else {
      // 生成随机数并返回
      const randomNumber = generateRandomNumber(minVal, maxVal);
      ctx.body = {
        randomNumber
      };
    }
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = {
      error: error.message
    };
  }
});

// 将路由应用到Koa实例
app.use(router.routes());
app.use(router.allowedMethods());

// 定义监听端口
const PORT = process.env.PORT || 3000;

// 启动Koa服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
