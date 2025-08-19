// 代码生成时间: 2025-08-19 19:41:55
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建一个Koa实例
const app = new Koa();
const router = new Router();

// 模拟数据库
const inventory = {
  'item1': { name: 'Item 1', quantity: 100 },
  'item2': { name: 'Item 2', quantity: 200 },
};

// 中间件解析请求体
app.use(bodyParser());

// 获取所有库存项
router.get('/inventory', async (ctx) => {
  try {
    ctx.body = inventory;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 获取单个库存项
router.get('/inventory/:itemId', async (ctx) => {
  const { itemId } = ctx.params;
  try {
    if (inventory[itemId]) {
      ctx.body = inventory[itemId];
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Item not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 更新库存项
router.put('/inventory/:itemId', async (ctx) => {
  const { itemId } = ctx.params;
  const { quantity } = ctx.request.body;
  try {
    if (inventory[itemId]) {
      inventory[itemId].quantity = quantity;
      ctx.body = { message: 'Inventory updated', updatedItem: inventory[itemId] };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Item not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 添加库存项
router.post('/inventory', async (ctx) => {
  const { name, quantity } = ctx.request.body;
  try {
    if (!inventory[name]) {
      inventory[name] = { name, quantity };
      ctx.status = 201;
      ctx.body = { message: 'Item added', addedItem: inventory[name] };
    } else {
      ctx.status = 409;
      ctx.body = { error: 'Item already exists' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 删除库存项
router.delete('/inventory/:itemId', async (ctx) => {
  const { itemId } = ctx.params;
  try {
    if (inventory[itemId]) {
      delete inventory[itemId];
      ctx.body = { message: 'Item deleted' };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Item not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 使用路由中间件
app.use(router.allowedMethods());
app.use(router.routes());

// 设置监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
