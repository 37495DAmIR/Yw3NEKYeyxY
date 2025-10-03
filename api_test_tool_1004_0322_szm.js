// 代码生成时间: 2025-10-04 03:22:20
const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const app = new Koa();
const router = new Router();

// 定义API测试工具的端口号
const PORT = 3000;

// 路由：测试API的接口
router.get('/test-api', async (ctx) => {
  try {
    // 从查询参数中获取API URL
    const apiUrl = ctx.query.url;
    // 从查询参数中获取请求方法类型
    const method = ctx.query.method;
    
    // 验证API URL
    if (!apiUrl) {
      throw new Error('API URL is required');
    }

    // 执行API请求
    const response = await axios({
      method,
      url: apiUrl,
    });

    // 设置响应状态码和返回响应数据
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (error) {
    // 错误处理：设置响应状态码和错误信息
    ctx.status = error.response ? error.response.status : 500;
    ctx.body = {
      message: error.response ? error.response.data.message : error.message,
    };
  }
});

// 使用路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 启动Koa应用并监听指定端口
app.listen(PORT, () => {
  console.log(`API Test Tool is running on http://localhost:${PORT}`);
});

// 文档说明：
// 该程序提供了一个简单的API测试工具，
// 通过访问 '/test-api' 路由并提供API URL和请求方法类型，
// 可以测试外部API的响应。
// 示例请求：GET请求 http://localhost:3000/test-api?url=https://api.example.com/data&method=get
