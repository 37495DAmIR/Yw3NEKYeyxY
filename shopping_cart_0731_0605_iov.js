// 代码生成时间: 2025-07-31 06:05:57
const Koa = require('koa');
const Router = require('koa-router');

// 创建一个Koa应用实例
const app = new Koa();
const router = new Router();

// 模拟数据库中的商品列表
const products = [
  { id: 1, name: 'Apple', price: 0.99 },
  { id: 2, name: 'Banana', price: 0.59 },
  { id: 3, name: 'Cherry', price: 2.99 },
];

// 购物车对象，用于存储用户添加的商品
let cart = {};

// 添加商品到购物车
router.post('/cart/add', async (ctx) => {
  const { productId, quantity } = ctx.request.body;
  if (!productId || !quantity) {
    ctx.status = 400;
    ctx.body = { error: 'Missing product ID or quantity' };
    return;
  }

  const product = products.find((product) => product.id === parseInt(productId));
  if (!product) {
    ctx.status = 404;
    ctx.body = { error: 'Product not found' };
    return;
  }

  if (cart[productId]) {
    cart[productId].quantity += quantity;
  } else {
    cart[productId] = { ...product, quantity };
  }

  ctx.status = 201;
  ctx.body = { message: 'Product added to cart', cart };
});

// 获取购物车中的商品
router.get('/cart', async (ctx) => {
  ctx.body = { cart };
});

// 从购物车中移除商品
router.delete('/cart/remove/:productId', async (ctx) => {
  const { productId } = ctx.params;
  if (cart[productId]) {
    delete cart[productId];
    ctx.status = 200;
    ctx.body = { message: 'Product removed from cart', cart };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Product not found in cart' };
  }
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动Koa服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 以下是代码解释：
//
// 1. 初始化Koa应用和Router实例。
// 2. 定义一个模拟的商品列表。
// 3. 创建一个购物车对象来存储用户添加的商品。
// 4. 定义'/cart/add'路由来添加商品到购物车。
//   - 检查请求体中是否包含productId和quantity。
//   - 查找商品是否存在。
//   - 更新购物车中的商品数量。
// 5. 定义'/cart'路由来获取购物车中的商品。
// 6. 定义'/cart/remove/:productId'路由来从购物车中移除商品。
//   - 使用URL参数来获取productId。
//   - 从购物车中移除商品。
// 7. 使用router.routes()和router.allowedMethods()来应用路由。
// 8. 监听指定端口启动Koa服务器。