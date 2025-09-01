// 代码生成时间: 2025-09-02 04:37:29
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

// 定义错误日志收集器类
class ErrorLogger {
    constructor() {
        this.logs = [];
        this.logPath = path.join(__dirname, 'error_logs.txt');
    }

    // 写入日志到文件
    writeLog(error) {
        const logEntry = `${new Date().toISOString()}: ${error.message}
`;
        fs.appendFileSync(this.logPath, logEntry, 'utf-8');
        this.logs.push(logEntry);
    }

    // 获取所有日志
    getAllLogs() {
        return this.logs;
    }
}

// 实例化Koa和Router
const app = new Koa();
const router = new Router();

// 实例化错误日志收集器
const errorLogger = new ErrorLogger();

// 创建一个中间件来捕获和记录错误
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 将错误信息记录到日志中
        errorLogger.writeLog(error);
        // 向客户端返回错误信息
        ctx.status = error.status || 500;
        ctx.body = {
            message: error.message
        };
    }
});

// 添加一个路由来获取所有日志
router.get('/error-logs', async (ctx) => {
    ctx.body = errorLogger.getAllLogs();
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动Koa服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
