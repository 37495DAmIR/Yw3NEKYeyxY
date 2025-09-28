// 代码生成时间: 2025-09-29 00:01:09
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { Pool } = require('pg'); // PostgreSQL client

// 创建数据库连接池
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// 创建KOA实例
const app = new Koa();

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 处理GET请求以防止SQL注入
app.get('/get-data', async (ctx) => {
  try {
    // 从查询参数中获取数据
    const { user_id } = ctx.query;
    
    // 使用参数化查询防止SQL注入
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
    
    // 设置响应状态码和返回结果
    ctx.status = 200;
    ctx.body = result.rows;
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    console.error(error);
  }
});

// 处理POST请求以防止SQL注入
app.post('/add-user', async (ctx) => {
  try {
    // 从请求体中获取数据
    const { username, email } = ctx.request.body;
    
    // 使用参数化查询防止SQL注入
    const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
    
    // 设置响应状态码和返回结果
    ctx.status = 201;
    ctx.body = result.rows[0];
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    console.error(error);
  }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 代码注释：
// - 使用参数化查询是防止SQL注入的最佳实践。
// - 错误处理确保了服务器在遇到问题时不会崩溃，并且能够向客户端返回适当的错误信息。
// - 代码结构清晰，易于理解，符合JS最佳实践。