// 代码生成时间: 2025-09-11 01:22:29
const Koa = require('koa');
const Router = require('koa-router');
const crypto = require('crypto');

// Define the encryption and decryption algorithms
const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY; // Should be stored securely and not hardcoded

// Initialize the KOA app and router
const app = new Koa();
const router = new Router();

// Helper function to pad the string to make its length a multiple of 16 (AES requirement)
function pad(text) {
  const padding = 16 - (text.length % 16);
  return text + ' '.repeat(padding);
}

// Helper function to encrypt the password
function encrypt(text) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(pad(text), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// Helper function to decrypt the password
function decrypt(encryptedText) {
  const parts = encryptedText.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = parts.join(':');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted.trim();
}

// Route to handle encryption
router.post('/encrypt', async (ctx) => {
  try {
    const { password } = ctx.request.body;
    if (!password) {
      throw new Error('Password is required');
    }
    const encryptedPassword = encrypt(password);
    ctx.body = { encrypted: encryptedPassword };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// Route to handle decryption
router.post('/decrypt', async (ctx) => {
  try {
    const { encryptedPassword } = ctx.request.body;
    if (!encryptedPassword) {
      throw new Error('Encrypted password is required');
    }
    const decryptedPassword = decrypt(encryptedPassword);
    ctx.body = { decrypted: decryptedPassword };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// Use the router middleware in the app
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});