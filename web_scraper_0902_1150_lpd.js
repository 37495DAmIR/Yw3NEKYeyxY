// 代码生成时间: 2025-09-02 11:50:05
const Koa = require('koa');
const axios = require('axios');
const cheerio = require('cheerio');
const app = new Koa();

// 定义端口号
const PORT = 3000;

// 抓取网页内容的函数
async function scrapeWebsite(url) {
  try {
    // 使用axios获取网页内容
    const response = await axios.get(url);
    const html = response.data;

    // 使用cheerio解析网页内容
    const $ = cheerio.load(html);

    // 这里可以根据需要提取网页中的特定内容
    // 例如，提取所有的段落
    const paragraphs = $('p').map((index, element) => $(element).text()).get();

    return paragraphs;
  } catch (error) {
    // 错误处理
    console.error('Error scraping website:', error.message);
    throw error;
  }
}

// Koa路由处理器，用于抓取指定URL的内容
app.use(async (ctx) => {
  // 从请求中获取URL参数
  const url = ctx.query.url;

  if (!url) {
    // 如果没有提供URL，返回错误信息
    ctx.status = 400;
    ctx.body = 'URL parameter is required';
    return;
  }

  try {
    // 调用抓取函数
    const data = await scrapeWebsite(url);
    // 设置响应类型为JSON并返回数据
    ctx.type = 'application/json';
    ctx.body = JSON.stringify({
      status: 'success',
      data: data,
    });
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = JSON.stringify({
      status: 'error',
      message: 'Failed to scrape website',
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Web scraper server running on http://localhost:${PORT}`);
});
