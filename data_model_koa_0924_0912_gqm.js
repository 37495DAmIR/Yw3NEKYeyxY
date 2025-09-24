// 代码生成时间: 2025-09-24 09:12:56
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 数据模型
class DataModel {
  constructor() {
    this.data = [];
  }

  // 添加数据
  addData(item) {
    this.data.push(item);
    return item;
  }

  // 获取所有数据
  getAllData() {
    return this.data;
  }

  // 获取单个数据
  getDataById(id) {
    const item = this.data.find(item => item.id === id);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }
}

// 实例化Koa和Router
const app = new Koa();
const router = new Router();

// 实例化数据模型
const dataModel = new DataModel();

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 定义路由
router.get('/data', async (ctx) => {
  // 获取所有数据
  try {
    const data = dataModel.getAllData();
    ctx.body = {
      status: 'success',
      data: data
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: error.message
    };
  }
});

router.post('/data', async (ctx) => {
  // 添加数据
  try {
    const item = ctx.request.body;
    const addedItem = dataModel.addData(item);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: addedItem
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: error.message
    };
  }
});

router.get('/data/:id', async (ctx) => {
  // 获取单个数据
  try {
    const id = ctx.params.id;
    const item = dataModel.getDataById(id);
    ctx.body = {
      status: 'success',
      data: item
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: error.message
    };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});