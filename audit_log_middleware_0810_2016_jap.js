// 代码生成时间: 2025-08-10 20:16:31
const Koa = require('koa');
const fs = require('fs');
const path = require('path');

// 创建一个新的Koa应用实例
const app = new Koa();

// 定义一个中间件来处理安全审计日志
function auditLogMiddleware() {
    return async (ctx, next) => {
        try {
            // 等待下一个中间件执行
            await next();

            // 定义日志文件路径
            const logFilePath = path.join(__dirname, 'audit_log.txt');

            // 获取当前日期和时间
            const now = new Date().toISOString();

            // 构建日志条目
            const logEntry = `[${now}] - Method: ${ctx.method}, Path: ${ctx.path}, Status: ${ctx.status}, IP: ${ctx.get('X-Forwarded-For') || ctx.ip}
`;

            // 将日志条目写入文件
            fs.appendFileSync(logFilePath, logEntry, 'utf8');

        } catch (error) {
            // 错误处理
            console.error('Error logging audit: ', error);
            // 可以选择抛出错误或者设置状态码
            ctx.status = 500;
            ctx.body = 'Internal Server Error';
        }
    };
}

// 使用安全审计日志中间件
app.use(auditLogMiddleware());

// 定义一个简单的路由来测试中间件
app.use(async ctx => {
    ctx.body = 'Hello World';
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// 模块化导出中间件以支持可扩展性
module.exports = auditLogMiddleware;