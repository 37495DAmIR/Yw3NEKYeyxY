// 代码生成时间: 2025-09-08 05:01:34
const Koa = require('koa');
const Router = require('koa-router');
const crypto = require('crypto');

// 创建一个新的Koa实例
const app = new Koa();
const router = new Router();

// 哈希计算函数
const calculateHash = (algorithm, input) => {
  return new Promise((resolve, reject) => {
    crypto[algorithm](input, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash.toString('hex'));
      }
    });
  });
};

// 哈希计算接口
router.post('/hash/:algorithm', async (ctx) => {
  // 从请求体中获取输入数据
  const { content } = ctx.request.body;
  // 从URL中获取算法名称
  const { algorithm } = ctx.params;

  // 检查算法是否存在
  if (!crypto.getHashes().includes(algorithm)) {
    ctx.status = 400;
    ctx.body = {
      error: `Unsupported algorithm: ${algorithm}`
    };
    return;
  }

  try {
    // 计算哈希值
    const hash = await calculateHash(algorithm, content);
    // 返回哈希值
    ctx.body = {
      hash
    };
  } catch (err) {
    // 错误处理
    ctx.status = 500;
    ctx.body = {
      error: 'Failed to calculate hash'
    };
  }
});

// 添加路由到Koa实例
app.use(router.routes()).use(router.allowedMethods());

// 监听指定端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hash Calculator service is running on port ${PORT}`);
});