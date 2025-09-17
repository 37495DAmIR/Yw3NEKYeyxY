// 代码生成时间: 2025-09-17 19:20:05
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// Mock database for inventory items
const inventoryDatabase = {
  items: [],
  addItem(item) {
    this.items.push(item);
  },
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
  },
  updateItem(itemId, newItem) {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.items[index] = newItem;
    }
  },
  getItems() {
    return this.items;
  }
};

// Koa application instance
const app = new Koa();
const router = new Router();

// Middleware to parse request body
app.use(bodyParser());

// API endpoint to get all inventory items
router.get('/inventory', async (ctx) => {
  try {
    const items = inventoryDatabase.getItems();
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: items
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to retrieve inventory items'
    };
  }
});

// API endpoint to add a new inventory item
router.post('/inventory', async (ctx) => {
  const { name, quantity } = ctx.request.body;
  try {
    if (!name || !quantity) {
      throw new Error('Name and quantity are required');
    }
    const newItem = { id: Date.now().toString(), name, quantity };
    inventoryDatabase.addItem(newItem);
    ctx.status = 201;
    ctx.body = {
      success: true,
      data: newItem
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: error.message
    };
  }
});

// API endpoint to remove an inventory item
router.delete('/inventory/:itemId', async (ctx) => {
  const { itemId } = ctx.params;
  try {
    inventoryDatabase.removeItem(itemId);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Item removed successfully'
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to remove item'
    };
  }
});

// API endpoint to update an inventory item
router.put('/inventory/:itemId', async (ctx) => {
  const { itemId } = ctx.params;
  const { name, quantity } = ctx.request.body;
  try {
    const newItem = { name, quantity };
    inventoryDatabase.updateItem(itemId, newItem);
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: newItem
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to update item'
    };
  }
});

// Register routes
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Inventory Management System listening on port ${PORT}`);
});
