// 代码生成时间: 2025-08-17 14:37:22
const Koa = require('koa');
const Router = require('koa-router');
const xlsx = require('node-xlsx');

// 创建一个Koa应用
const app = new Koa();
const router = new Router();

// 定义生成Excel表格的函数
function generateExcel(data) {
  const buffer = xlsx.build([{
    name: 'Sheet1',
    data: data,
  }]);
  return buffer;
}

// 定义生成Excel表格的API
router.get('/generate-excel', async (ctx) => {
  try {
    // 模拟数据
    const data = [
      {
        'Name': 'John',
        'Age': 30,
        'City': 'New York',
      },
      {
        'Name': 'Doe',
        'Age': 22,
        'City': 'Los Angeles',
      },
      // 可以添加更多行数据
    ];

    // 使用generateExcel函数生成Excel表格
    const excelBuffer = generateExcel(data);

    // 设置响应头
    ctx.set('Content-Disposition', 'attachment; filename=sample.xlsx');
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    ctx.body = excelBuffer;
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = 'An error occurred while generating the Excel file.';
  }
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Excel generator server is running on port ${PORT}`);
});

// 代码注释：
// 1. 引入Koa和Router用于创建服务器和路由。
// 2. 引入node-xlsx库用于生成Excel文件。
// 3. 定义generateExcel函数，接受数据并返回生成的Excel文件的Buffer。
// 4. 定义一个路由，当访问/generate-excel时，生成一个Excel文件并作为响应发送给客户端。
// 5. 在生成Excel文件时，使用try-catch结构进行错误处理。
// 6. 设置Content-Disposition响应头，指示浏览器下载文件。
// 7. 设置Content-Type响应头，指定文件类型为Excel文件。
// 8. 监听3000端口，并在控制台输出服务器运行的信息。