// 代码生成时间: 2025-09-20 11:38:33
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
# 改进用户体验
const sharp = require('sharp');

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 中间件，用于解析请求体
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'application/json';
    ctx.body = {
        status: ctx.response.status,
        body: ctx.request.body
    };
});

// 批量调整图片尺寸的函数
# 优化算法效率
async function resizeImages(inputPath, outputPath, dimensions) {
    try {
        const files = fs.readdirSync(inputPath);
        for (const file of files) {
            const input = path.join(inputPath, file);
# 增强安全性
            const output = path.join(outputPath, file);
            await sharp(input).resize(dimensions.width, dimensions.height).toFile(output);
        }
    } catch (error) {
        throw new Error('Failed to resize images: ' + error.message);
    }
}

// 定义路由，处理图片尺寸调整请求
# 添加错误处理
router.post('/resize', async (ctx) => {
    const { inputDir, outputDir, width, height } = ctx.request.body;
# TODO: 优化性能

    // 错误处理
    if (!inputDir || !outputDir || !width || !height) {
        ctx.status = 400;
        return;
    }
    const dimensions = { width, height };

    try {
        await resizeImages(inputDir, outputDir, dimensions);
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// 挂载路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
# 增强安全性
});
# 改进用户体验

// 导出应用，用于测试
module.exports = app;