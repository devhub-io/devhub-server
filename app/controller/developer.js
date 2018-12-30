'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CategoryController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), page: toInt(ctx.query.page) || 1, type: ctx.query.type || 'User' };
    this.ctx.body = await ctx.service.developer.list(query);
  }
}

module.exports = CategoryController;
