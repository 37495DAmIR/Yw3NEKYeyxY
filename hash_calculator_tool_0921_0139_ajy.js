// 代码生成时间: 2025-09-21 01:39:51
const Koa = require('koa');
const Router = require('koa-router');
const crypto = require('crypto');

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 哈希值计算函数
function calculateHash(input, algorithm) {
  return new Promise((resolve, reject) => {
    crypto[algorithm](input, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash.toString('hex'));
      }
    });
  });
}

// 路由处理函数，接收输入数据和哈希算法类型
router.post('/calculate-hash', async (ctx) => {
  try {
    const { data, algorithm = 'sha256' } = ctx.request.body;
    // 校验输入数据和算法类型
    if (!data || typeof data !== 'string') {
      throw new Error('Invalid data provided');
    }
    if (!crypto[algorithm]) {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
    
    // 计算哈希值
    const hash = await calculateHash(data, algorithm);
    
    // 设置响应内容和状态码
    ctx.status = 200;
    ctx.body = {
      message: 'Hash calculated successfully',
      hash,
      algorithm
    };
  } catch (error) {
    // 错误处理
    ctx.status = 400;
    ctx.body = {
      message: error.message
    };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 设置监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`Hash calculator tool is running on port ${port}`);
});

// 模块导出，方便测试
module.exports = {
  app,
  calculateHash
};