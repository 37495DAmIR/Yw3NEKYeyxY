// 代码生成时间: 2025-08-01 08:48:27
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken'); // 使用jsonwebtoken库进行JWT认证

// 常量，用于JWT的秘钥
const JWT_SECRET = 'your_jwt_secret';

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 中间件：解析请求体
app.use(async (ctx, next) => {
    await next();
    // 简单的错误处理中间件
    if (ctx.status === 404) {
        ctx.status = 404;
        ctx.body = { status: 404, message: 'Not Found' };
    } else if (ctx.status === 500) {
        ctx.status = 500;
        ctx.body = { status: 500, message: 'Internal Server Error' };
    }
});

// 中间件：JWT验证
const verifyJWT = (ctx, next) => {
    const token = ctx.get('Authorization');
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                ctx.status = 401;
                ctx.body = { status: 401, message: 'Invalid token' };
            } else {
                // 将解码后的用户信息添加到请求中
                ctx.state.user = decoded;
                return next();
            }
        });
    } else {
        ctx.status = 401;
        ctx.body = { status: 401, message: 'No authorization token was found' };
    }
};

// 定义受保护的路由
router.get('/protected', verifyJWT, async (ctx) => {
    // 仅当JWT验证通过时执行
    ctx.body = {
        status: 200,
        message: 'Access granted to protected route',
        user: ctx.state.user
    };
});

// 定义未受保护的路由
router.get('/public', async (ctx) => {
    ctx.body = {
        status: 200,
        message: 'Access to public route'
    };
});

// 挂载路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

// 注意：在实际部署时，JWT_SECRET 应该是一个安全的密钥，不应该硬编码在代码中。