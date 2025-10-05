// 代码生成时间: 2025-10-06 01:49:24
const Koa = require('koa');
const Router = require('koa-router');
const os = require('os');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 定义一个简单的进程管理器
class ProcessManager {
  constructor() {
    this.processes = [];
  }

  // 添加进程
  addProcess(processName) {
    const process = {
      name: processName,
      status: 'running'
    };
    this.processes.push(process);
    return process;
  }

  // 获取所有进程
  getAllProcesses() {
    return this.processes;
  }

  // 停止进程
  stopProcess(processName) {
    const process = this.processes.find(p => p.name === processName);
    if (process) {
      process.status = 'stopped';
      return true;
    }
    return false;
  }
}

// 实例化进程管理器
const manager = new ProcessManager();

// 路由配置
router.get('/processes', async (ctx) => {
  try {
    const processes = manager.getAllProcesses();
    ctx.body = {
      success: true,
      data: processes
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to fetch processes'
    };
  }
});

router.post('/processes', async (ctx) => {
  const { processName } = ctx.request.body;
  try {
    const process = manager.addProcess(processName);
    ctx.status = 201;
    ctx.body = {
      success: true,
      data: process
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to add process'
    };
  }
});

router.delete('/processes/:processName', async (ctx) => {
  const { processName } = ctx.params;
  try {
    if (manager.stopProcess(processName)) {
      ctx.body = {
        success: true,
        message: 'Process stopped successfully'
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: 'Process not found'
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to stop process'
    };
  }
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 启动Koa服务
const port = 3000;
app.listen(port, () => {
  console.log(`Process Manager app listening on port ${port}`);
});