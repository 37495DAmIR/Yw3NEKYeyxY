// 代码生成时间: 2025-09-03 07:04:58
const Koa = require('koa');
const Router = require('koa-router');

// 创建一个新的Koa实例
const app = new Koa();
const router = new Router();

// 定义一个数学计算工具集的类
class MathCalculator {
  // 加法
  add(a, b) {
    return a + b;
  }
  // 减法
  subtract(a, b) {
    return a - b;
  }
  // 乘法
  multiply(a, b) {
    return a * b;
  }
  // 除法
  divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}

// 实例化MathCalculator
const calculator = new MathCalculator();

// 定义路由和处理函数
router.get('/add/:a/:b', async (ctx) => {
  try {
    const result = calculator.add(+ctx.params.a, +ctx.params.b);
    ctx.body = { result };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

router.get('/subtract/:a/:b', async (ctx) => {
  try {
    const result = calculator.subtract(+ctx.params.a, +ctx.params.b);
    ctx.body = { result };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

router.get('/multiply/:a/:b', async (ctx) => {
  try {
    const result = calculator.multiply(+ctx.params.a, +ctx.params.b);
    ctx.body = { result };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

router.get('/divide/:a/:b', async (ctx) => {
  try {
    const result = calculator.divide(+ctx.params.a, +ctx.params.b);
    ctx.body = { result };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000, () => {
  console.log('Math Calculator is running on http://localhost:3000');
});