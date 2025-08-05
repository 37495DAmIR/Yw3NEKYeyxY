// 代码生成时间: 2025-08-05 11:26:40
const Koa = require('koa');
const Router = require('koa-router');
const ExcelJS = require('exceljs');
const path = require('path');

// 初始化Koa应用
const app = new Koa();
const router = new Router();

// 定义生成Excel文件的函数
async function generateExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');
  worksheet.addRow(Object.keys(data[0]));
  data.forEach(row => worksheet.addRow(Object.values(row)));

  const filename = `generated_${Date.now()}.xlsx`;
  await workbook.xlsx.writeFileAsync(path.join(__dirname, 'output', filename));

  return {
    status: 'success',
    path: `/output/${filename}`,
    message: 'Excel file generated successfully'
  };
}

// 定义生成Excel的路由
router.post('/generate', async (ctx) => {
  try {
    const { data } = ctx.request.body;
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid data format');
    }
    const result = await generateExcel(data);
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: error.message
    };
  }
});

// 定义静态文件夹，用于提供生成的Excel文件
app.use(require('koa-static')(path.join(__dirname, 'output')));

// 将路由应用到Koa应用
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000, () => {
  console.log('Excel generator service listening on port 3000');
});

// 代码注释：
// 1. 我们首先引入了Koa, Router和ExcelJS库。
// 2. 初始化Koa应用和路由。
// 3. 定义了一个异步函数generateExcel，用于生成Excel文件。
// 4. 我们定义了一个POST路由/generate，用于接收数据并生成Excel文件。
// 5. 错误处理，如果数据格式不正确或生成Excel失败，会返回错误信息。
// 6. 使用koa-static提供静态文件服务，允许用户下载生成的Excel文件。
// 7. 监听3000端口，启动服务。
