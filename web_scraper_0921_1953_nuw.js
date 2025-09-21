// 代码生成时间: 2025-09-21 19:53:48
const Koa = require('koa');
const axios = require('axios');
const cheerio = require('cheerio');
const app = new Koa();

// 函数：抓取网页内容
async function fetchWebContent(url) {
  try {
    // 使用axios获取网页内容
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching web content:', error);
    throw error;
  }
}

// 函数：解析网页内容
function parseWebContent(html, selector) {
  const $ = cheerio.load(html);
  return $(selector).text();
}

// 路由：抓取并返回网页内容
app.use(async ctx => {
  const url = ctx.query.url;
  if (!url) {
    ctx.status = 400;
    ctx.body = { error: 'URL parameter is required' };
    return;
  }
  try {
    // 获取网页内容
    const html = await fetchWebContent(url);
    // 解析网页内容
    const content = parseWebContent(html, ctx.query.selector ? ctx.query.selector : 'body');
    // 返回解析后的内容
    ctx.body = { content };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to scrape web content' };
  }
});

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web scraper app listening on port ${PORT}`);
});