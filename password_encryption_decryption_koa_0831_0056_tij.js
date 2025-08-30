// 代码生成时间: 2025-08-31 00:56:24
const Koa = require('koa');
const Router = require('koa-router');
const crypto = require('crypto');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 密码加密函数
const encryptPassword = (password) => {
    const salt = crypto.randomBytes(32).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    return { salt, hash };
};

// 密码解密函数（验证）
const decryptPassword = (password, salt, hash) => {
    const hashed = crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64'), 10000, 64, 'sha512').toString('base64');
    return hashed === hash;
};

// 加密密码的路由
router.post('/encrypt', async (ctx) => {
    const { password } = ctx.request.body;
    if (!password) {
        ctx.status = 400;
        ctx.body = 'Password is required';
        return;
    }
    const { salt, hash } = encryptPassword(password);
    ctx.body = { salt, hash };
});

// 解密密码的路由
router.post('/decrypt', async (ctx) => {
    const { password, salt, hash } = ctx.request.body;
    if (!password || !salt || !hash) {
        ctx.status = 400;
        ctx.body = 'Password, salt, and hash are required';
        return;
    }
    const isMatch = decryptPassword(password, salt, hash);
    ctx.body = { success: isMatch };
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/**
 * @module Password Encryption/Decryption Service
 *
 * This module provides a simple Koa-based service for encrypting and decrypting passwords.
 * It uses the `crypto` module for password hashing and salt generation.
 *
 * @example
 * const { encryptPassword, decryptPassword } = require('./password_encryption_decryption_koa');
 * const { salt, hash } = encryptPassword('password123');
 * console.log(decryptPassword('password123', salt, hash)); // true
 */