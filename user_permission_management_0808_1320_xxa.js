// 代码生成时间: 2025-08-08 13:20:09
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 初始化Koa应用
const app = new Koa();
const router = new Router();

// 中间件：解析请求体
app.use(bodyParser());

// 模拟数据库，存储用户信息和权限
const users = {
    '1': { id: 1, username: 'admin', permissions: ['read', 'write', 'delete'] },
    '2': { id: 2, username: 'user', permissions: ['read'] }
};

// 获取用户权限
router.get('/user/:id/permissions', async (ctx) => {
    const { id } = ctx.params;
    if (users[id]) {
        ctx.body = users[id].permissions;
    } else {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
    }
});

// 更新用户权限
router.post('/user/:id/permissions', async (ctx) => {
    const { id } = ctx.params;
    const { permissions } = ctx.request.body;
    if (users[id]) {
        users[id].permissions = permissions;
        ctx.body = { success: 'Permissions updated', permissions };
    } else {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
    }
});

// 错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.body = 'Page Not Found';
        }
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { error: err.message };
    }
});

// 路由注册
app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// 注释和文档
/*
 * 用户权限管理系统
 *
 * 功能：
 * - 获取用户权限
 * - 更新用户权限
 *
 * 路由：
 * - GET /user/:id/permissions
 * - POST /user/:id/permissions
 *
 * 数据库模拟：
 * - users: 一个对象，模拟存储用户信息和权限
 */