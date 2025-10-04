// 代码生成时间: 2025-10-04 20:34:48
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// 模拟游戏数据
const gameData = {
  players: [
    { id: 1, name: 'Alice', score: 120 },
    { id: 2, name: 'Bob', score: 85 },
    { id: 3, name: 'Charlie', score: 95 },
  ],
};

// 获取玩家数据
router.get('/players', async (ctx) => {
  try {
    ctx.body = gameData.players;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

// 获取单个玩家数据
router.get('/players/:id', async (ctx) => {
  const { id } = ctx.params;
  const player = gameData.players.find(p => p.id === parseInt(id));
  if (player) {
    ctx.body = player;
  } else {
    ctx.status = 404;
    ctx.body = 'Player not found';
  }
});

// 添加新玩家
router.post('/players', async (ctx) => {
  try {
    const newPlayer = ctx.request.body;
    gameData.players.push(newPlayer);
    ctx.status = 201;
    ctx.body = { message: 'Player added successfully', player: newPlayer };
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

// 更新玩家数据
router.put('/players/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const playerIndex = gameData.players.findIndex(p => p.id === parseInt(id));
    if (playerIndex !== -1) {
      gameData.players[playerIndex] = ctx.request.body;
      ctx.body = { message: 'Player updated successfully', player: gameData.players[playerIndex] };
    } else {
      ctx.status = 404;
      ctx.body = 'Player not found';
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

// 删除玩家
router.delete('/players/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const playerIndex = gameData.players.findIndex(p => p.id === parseInt(id));
    if (playerIndex !== -1) {
      gameData.players.splice(playerIndex, 1);
      ctx.body = { message: 'Player deleted successfully' };
    } else {
      ctx.status = 404;
      ctx.body = 'Player not found';
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });