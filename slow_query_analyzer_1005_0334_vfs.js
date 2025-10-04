// 代码生成时间: 2025-10-05 03:34:23
const Koa = require('koa');
const Router = require('koa-router');

// 慢查询分析器中间件
class SlowQueryAnalyzer {
  constructor(threshold) {
    this.threshold = threshold;
  }

  // 拦截请求，计算请求处理时间
  middleware() {
    return async (ctx, next) => {
      const start = process.hrtime.bigint();
      try {
        await next();
        const diff = process.hrtime.bigint() - start;
        const nanoseconds = diff / BigInt(1e6);

        // 如果请求处理时间超过阈值，则记录慢查询
        if (nanoseconds > this.threshold) {
          const queryDetails = ctx.state.queryDetails;
          console.error(`Slow query detected: ${queryDetails.query} took ${nanoseconds}ms`, queryDetails);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
      }
    };
  }
}

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 设置慢查询阈值，单位为毫秒
const slowQueryThreshold = 100;
const slowQueryAnalyzer = new SlowQueryAnalyzer(slowQueryThreshold);

// 应用中间件
app.use(slowQueryAnalyzer.middleware());

// 示例API，模拟数据库查询
router.get('/query', async (ctx) => {
  const simulateQuery = new Promise((resolve) => {
    setTimeout(() => {
      ctx.state.queryDetails = {
        query: 'SELECT * FROM users',
        startTime: new Date()
      };
      resolve();
    }, 150); // 模拟150ms的查询时间
  });
  await simulateQuery;
  ctx.body = 'Query executed';
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 代码注释：
// SlowQueryAnalyzer 类用于分析慢查询，构造函数接受一个阈值参数，表示慢查询的时间阈值。
// middleware 方法是一个异步函数，它计算请求处理时间并与阈值比较，若超过阈值则记录慢查询。
// Koa 应用初始化并使用 SlowQueryAnalyzer 中间件。
// 定义了 /query 路由用于模拟数据库查询，超过阈值时将记录慢查询。