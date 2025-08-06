// 代码生成时间: 2025-08-06 13:45:05
const Koa = require('koa');
const Router = require('koa-router');
const { exec } = require('child_process');

// Create a new Koa instance
const app = new Koa();
const router = new Router();

// Utility function to fetch current system processes
const getProcesses = () => {
  return new Promise((resolve, reject) => {
    exec('ps aux', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Utility function to kill a process by PID
const killProcess = (pid) => {
  return new Promise((resolve, reject) => {
    exec(`kill ${pid}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Route to get all processes
router.get('/processes', async (ctx) => {
  try {
    const processes = await getProcesses();
    ctx.body = {
      success: true,
      data: processes
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to retrieve processes',
      error: error.message
    };
  }
});

// Route to kill a process
router.post('/process/:pid', async (ctx) => {
  const { pid } = ctx.params;
  try {
    const result = await killProcess(pid);
    ctx.body = {
      success: true,
      message: 'Process killed successfully',
      data: result
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to kill process',
      error: error.message
    };
  }
});

// Mount routes
app.use(router.routes());
app.use(router.allowedMethods());

// Start the Koa server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Process Manager is running on port ${PORT}`);
});