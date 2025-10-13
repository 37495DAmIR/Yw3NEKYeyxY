// 代码生成时间: 2025-10-14 03:12:23
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 挖矿池管理类
class MiningPoolManager {
  constructor() {
    this.miners = [];
  }
  
  // 添加矿工
  addMiner(miner) {
    if (!miner.name || !miner.capacity) {
      throw new Error('Miner must have a name and capacity');
    }
    this.miners.push(miner);
  }
  
  // 移除矿工
  removeMiner(minerName) {
    this.miners = this.miners.filter(miner => miner.name !== minerName);
  }
  
  // 获取所有矿工信息
  getAllMiners() {
    return this.miners;
  }
}

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 实例化挖矿池管理类
const miningPoolManager = new MiningPoolManager();

// 解析请求体
app.use(bodyParser());

// 定义路由
router.post('/miners', async (ctx) => {
  try {
    const { name, capacity } = ctx.request.body;
    miningPoolManager.addMiner({ name, capacity });
    ctx.status = 201;
    ctx.body = { message: 'Miner added successfully' };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

router.delete('/miners/:name', async (ctx) => {
  try {
    const { name } = ctx.params;
    miningPoolManager.removeMiner(name);
    ctx.status = 200;
    ctx.body = { message: 'Miner removed successfully' };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

router.get('/miners', async (ctx) => {
  ctx.status = 200;
  ctx.body = miningPoolManager.getAllMiners();
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});