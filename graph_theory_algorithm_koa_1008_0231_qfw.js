// 代码生成时间: 2025-10-08 02:31:25
const Koa = require('koa');
const Router = require('koa-router');

// 创建一个Koa应用
const app = new Koa();
const router = new Router();

// 定义图的数据结构
class Graph {
  constructor(vertices) {
    this.V = vertices; // 顶点数
    this.graph = []; // 邻接矩阵
  }

  // 添加边
  addEdge(v, w) {
    this.graph[v].push(w); // 在v的邻接列表中添加w
    this.graph[w].push(v); // 无向图，需添加双向连接
  }

  // 广度优先搜索（BFS）
  bfs(s) {
    let visited = new Array(this.V).fill(false);
    let queue = [];
    visited[s] = true;
    queue.push(s);

    while (queue.length !== 0) {
      let v = queue.shift();
      console.log(v);
      for (let i = 0; i < this.graph[v].length; ++i) {
        let adjVertex = this.graph[v][i];
        if (!visited[adjVertex]) {
          visited[adjVertex] = true;
          queue.push(adjVertex);
        }
      }
    }
  }

  // 深度优先搜索（DFS）
  dfs(s) {
    let visited = new Array(this.V).fill(false);
    let stack = [s];
    visited[s] = true;

    while (stack.length) {
      let v = stack.pop();
      console.log(v);
      for (let i = this.graph[v].length - 1; i >= 0; --i) {
        let adjVertex = this.graph[v][i];
        if (!visited[adjVertex]) {
          visited[adjVertex] = true;
          stack.push(adjVertex);
        }
      }
    }
  }
}

// 路由处理
router.post('/bfs', async (ctx) => {
  try {
    const { nodes, edges } = ctx.request.body;
    const graph = new Graph(nodes);
    edges.forEach(([start, end]) => graph.addEdge(start, end));
    graph.bfs(0);
    ctx.body = { result: 'BFS completed successfully' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

router.post('/dfs', async (ctx) => {
  try {
    const { nodes, edges } = ctx.request.body;
    const graph = new Graph(nodes);
    edges.forEach(([start, end]) => graph.addEdge(start, end));
    graph.dfs(0);
    ctx.body = { result: 'DFS completed successfully' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});