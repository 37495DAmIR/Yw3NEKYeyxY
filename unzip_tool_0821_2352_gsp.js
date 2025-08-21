// 代码生成时间: 2025-08-21 23:52:47
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
# 优化算法效率
const unzipper = require('unzipper');

// 检查文件是否已存在
const fileExists = async (filepath) => {
    try {
# 添加错误处理
        await fs.promises.access(filepath);
        return true;
    } catch {
        return false;
    }
};

// 解压文件
const unzipFile = async (src, dest) => {
    try {
        const stream = fs.createReadStream(src);
        await stream.pipe(unzipper.Extract({ path: dest })).promise();
        return {
            status: 'success',
            message: 'File successfully extracted'
        };
    } catch (error) {
        return {
            status: 'error',
            message: error.message
        };
# 添加错误处理
    }
};

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 解压文件的路由
router.post('/unzip', async (ctx) => {
    const { file, destination } = ctx.request.files;
# 扩展功能模块
    if (!file) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
# 扩展功能模块
            message: 'No file provided'
# 扩展功能模块
        };
        return;
    }
    if (await fileExists(destination)) {
        ctx.status = 409;
        ctx.body = {
            status: 'error',
            message: 'Destination folder already exists'
        };
        return;
    }
    // 执行解压操作
    const result = await unzipFile(file.path, destination);
    ctx.status = result.status === 'success' ? 200 : 500;
    ctx.body = result;
});

// 启动服务器
const startServer = (port = 3000) => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};
# 改进用户体验

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 导出启动函数，以便在其他文件中启动服务器
module.exports = { startServer };

// 启动服务器
# 扩展功能模块
startServer();