// 代码生成时间: 2025-08-27 10:13:28
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

// Middleware to handle the folder structure organizing
const organizeFolderStructure = async (ctx) => {
  const { folderPath } = ctx.query;
  if (!folderPath) {
    ctx.status = 400;
    ctx.body = { error: 'Folder path is required.' };
    return;
  }
  try {
    // Validate if the folder path is a directory
    const stats = await fs.promises.stat(folderPath);
    if (!stats.isDirectory()) {
      throw new Error('Provided path is not a directory.');
    }

    // Organize the folder structure
    const files = await fs.promises.readdir(folderPath);
    const organizedFiles = organizeFiles(files);
    // Save the organized files to a new directory
    await saveOrganizedFiles(organizedFiles, folderPath);

    ctx.status = 200;
    ctx.body = { message: 'Folder structure organized successfully.', folderPath };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
};

// Function to organize files into categories
function organizeFiles(files) {
  // This is a placeholder function for file organization logic.
  // You can implement your own logic based on file types, names, etc.
  const organized = {
    'documents': [],
    'images': [],
    'videos': [],
    'others': []
  };
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    switch (ext) {
      case '.docx':
      case '.pdf':
      case '.txt':
        organized.documents.push(file);
        break;
      case '.jpg':
      case '.png':
      case '.gif':
        organized.images.push(file);
        break;
      case '.mp4':
      case '.avi':
        organized.videos.push(file);
        break;
      default:
        organized.others.push(file);
    }
  });
  return organized;
}

// Function to save organized files into a new directory
async function saveOrganizedFiles(organizedFiles, folderPath) {
  const destPath = path.join(folderPath, 'organized');
  await fs.promises.mkdir(destPath, { recursive: true });
  Object.keys(organizedFiles).forEach(category => {
    const catPath = path.join(destPath, category);
    await fs.promises.mkdir(catPath, { recursive: true });
    organizedFiles[category].forEach(file => {
      const src = path.join(folderPath, file);
      const dest = path.join(catPath, file);
      fs.copyFileSync(src, dest);
    });
  });
}

// Define the route for organizing the folder structure
app.use(async ctx => {
  if (ctx.path === '/organize') {
    await organizeFolderStructure(ctx);
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Not Found' };
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Folder structure organizer is running on http://localhost:${port}`);
});