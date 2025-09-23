// 代码生成时间: 2025-09-24 01:12:24
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建 Koa 实例
const app = new Koa();
const router = new Router();

// 用于存储购物车数据，这里简单使用内存对象代替数据库
const cart = {};

// 添加中间件解析请求体
app.use(bodyParser());

// 添加购物车项
router.post('/cart/add', async (ctx) => {
    const { productId, quantity } = ctx.request.body;
    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
        ctx.status = 400; // 客户端请求错误
        ctx.body = {
            error: 'Invalid input'
        };
        return;
    }
    
    // 检查产品ID是否存在
    if (cart[productId]) {
        cart[productId] += quantity; // 如果存在则增加数量
    } else {
        cart[productId] = quantity; // 否则添加新的产品项
    }
    
    ctx.status = 200;
    ctx.body = {
        success: true,
        message: 'Product added to cart',
        cart: cart
    };
});

// 获取购物车内容
router.get('/cart', async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        success: true,
        cart: cart
    };
});

// 从购物车中移除一项
router.delete('/cart/remove/:productId', async (ctx) => {
    const { productId } = ctx.params;
    if (!productId) {
        ctx.status = 400; // 客户端请求错误
        ctx.body = {
            error: 'Product ID is required'
        };
        return;
    }
    
    // 检查产品是否在购物车中
    if (cart[productId]) {
        delete cart[productId];
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: 'Product removed from cart',
            cart: cart
        };
    } else {
        ctx.status = 404; // 未找到
        ctx.body = {
            error: 'Product not found in cart'
        };
    }
});

// 路由注册
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});