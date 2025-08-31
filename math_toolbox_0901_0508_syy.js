// 代码生成时间: 2025-09-01 05:08:15
const Koa = require('koa');
const Router = require('koa-router');

// 创建Koa实例
const app = new Koa();
// 创建router实例
const router = new Router();

// 数学计算工具集
class MathToolbox {
  // 加法计算
  add(a, b) {
    return a + b;
  }

  // 减法计算
  subtract(a, b) {
    return a - b;
  }

  // 乘法计算
  multiply(a, b) {
    return a * b;
  }

  // 除法计算
  divide(a, b) {
    if (b === 0) {
      throw new Error('除数不能为0');
    }
    return a / b;
  }
}

// 实例化MathToolbox
const mathToolbox = new MathToolbox();

// 路由配置
router.get('/add/:a/:b', (ctx) => {
  const { a, b } = ctx.params;
  try {
    ctx.body = {
      result: mathToolbox.add(Number(a), Number(b))
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message
    };
  }
});

router.get('/subtract/:a/:b', (ctx) => {
  const { a, b } = ctx.params;
  try {
    ctx.body = {
      result: mathToolbox.subtract(Number(a), Number(b))
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message
    };
  }
});

router.get('/multiply/:a/:b', (ctx) => {
  const { a, b } = ctx.params;
  try {
    ctx.body = {
      result: mathToolbox.multiply(Number(a), Number(b))
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message
    };
  }
});

router.get('/divide/:a/:b', (ctx) => {
  const { a, b } = ctx.params;
  try {
    ctx.body = {
      result: mathToolbox.divide(Number(a), Number(b))
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message
    };
  }
});

// 使用中间件
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});