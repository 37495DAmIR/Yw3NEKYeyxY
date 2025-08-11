// 代码生成时间: 2025-08-12 00:46:55
// image_resizer_koa_app.js

// 引入依赖
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // 用于图像处理的库

// 创建Koa应用实例
const app = new Koa();
const router = new Router();

// 定义路由
router.post('/resize-images', async (ctx) => {
    // 从请求体中获取图片信息
    const { imagesPath, targetWidth, targetHeight } = ctx.request.body;

    // 校验输入参数
    if (!imagesPath || typeof targetWidth !== 'number' || typeof targetHeight !== 'number') {
        ctx.status = 400;
        ctx.body = { error: 'Invalid input parameters' };
        return;
    }

    // 确保目标尺寸是合理的
    if (targetWidth <= 0 || targetHeight <= 0) {
        ctx.status = 400;
        ctx.body = { error: 'Target dimensions must be positive numbers' };
        return;
    }

    // 处理图片尺寸调整
    try {
        const resizedImages = await Promise.all(imagesPath.map(async (imagePath) => {
            // 读取图片文件
            const image = await sharp(imagePath).resize({
                width: targetWidth,
                height: targetHeight
            })
            .toBuffer();

            // 生成新的文件名
            const newFileName = path.basename(imagePath).split('.')[0] + `_${targetWidth}x${targetHeight}.` + path.extname(imagePath);
            const targetPath = path.join(path.dirname(imagePath), newFileName);

            // 写入新的图像文件
            await fs.promises.writeFile(targetPath, image);
            return targetPath;
        }));

        // 返回新文件的路径
        ctx.status = 200;
        ctx.body = { resizedImages };
    } catch (error) {
        // 错误处理
        ctx.status = 500;
        ctx.body = { error: 'Failed to resize images', details: error.message };
    }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// 模块化导出应用实例以便于测试
module.exports = app;