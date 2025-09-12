// 代码生成时间: 2025-09-12 20:39:57
const Koa = require('koa');
const Router = require('koa-router');

// A simple in-memory store to keep track of the theme
const themesStore = {
  'theme': 'light'
};

// Initialize Koa application
const app = new Koa();
// Initialize Router
const router = new Router();

// POST endpoint to switch theme
router.post('/api/switch-theme', async (ctx) => {
  // Get the new theme from the request body
  const { newTheme } = ctx.request.body;
  
  // Validate the theme
  if (typeof newTheme !== 'string' || ['light', 'dark'].indexOf(newTheme) === -1) {
    // Send an error response if the theme is not valid
    ctx.status = 400;
    ctx.body = {
      error: 'Invalid theme. Please choose 