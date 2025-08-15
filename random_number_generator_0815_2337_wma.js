// 代码生成时间: 2025-08-15 23:37:22
const Koa = require('koa');
const Router = require('koa-router');

// 创建Koa实例
const app = new Koa();
// 创建Router实例
const router = new Router();

// 随机数生成器中间件
router.get('/random', async (ctx) => {
    // 获取查询参数
    const { min = 0, max = 100, count = 1 } = ctx.query;

    // 参数校验
    if (isNaN(min) || isNaN(max) || isNaN(count)) {
        ctx.status = 400;
        ctx.body = {
            error: 'Invalid parameters, please provide numeric values for min, max, and count'
        };
        return;
    }

    // 生成随机数数组
    const randomNumbers = [];
    for (let i = 0; i < parseInt(count); i++) {
        randomNumbers.push(Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min));
    }

    // 设置响应体
    ctx.body = {
        randomNumbers
    };
});

// 使用Router
app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// 代码注释：
// 这个简单的Koa程序实现了一个随机数生成器的API。
// 用户可以通过GET请求访问'/random'路径，并提供查询参数min, max和count来分别指定
// 随机数的最小值、最大值和生成数量。
// 如果参数无效或者缺失，程序会返回400错误。否则，程序会生成随机数数组并返回。
