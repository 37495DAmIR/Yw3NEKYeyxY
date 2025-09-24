// 代码生成时间: 2025-09-24 20:34:27
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip'); // Node.js library for handling zip files

// Initialize the Koa app
const app = new Koa();
const router = new Router();

// Middleware to handle file uploads
const upload = require('koa-upload')({
  directory: 'uploads/', // Directory where uploaded files will be stored
  // Other upload options can be added here
});

// Function to unzip a file
function unzipFile(zipFilePath, targetDir) {
  try {
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(targetDir, /* overwrite */ true);
    return {
      status: 'success',
      message: 'File unzipped successfully'
    };
  } catch (error) {
    return {
      status: 'error',
      message: `Failed to unzip file: ${error.message}`,
    };
  }
}

// Route to handle POST requests for file uploads
router.post('/unzip', upload.single('file'), async (ctx) => {
  const file = ctx.file;
  if (!file) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'No file uploaded'
    };
    return;
  }
  const targetDir = path.join(__dirname, 'unzipped');
  fs.mkdirSync(targetDir, { recursive: true }); // Create the directory if it doesn't exist

  const result = unzipFile(file.path, targetDir);
  ctx.status = result.status === 'success' ? 200 : 500;
  ctx.body = result;
});

// Start the server
const PORT = 3000;
app.use(router.allowedMethods()).use(router.routes());
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});