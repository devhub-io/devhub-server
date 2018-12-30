'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ReposController extends Controller {

  async hottest() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), page: toInt(ctx.query.page) || 1 };
    query.order = 'stargazers_count';
    ctx.body = await ctx.service.repos.list(query);
  }

  async newest() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), page: toInt(ctx.query.page) || 1 };
    query.order = 'repos_created_at';
    ctx.body = await ctx.service.repos.list(query);
  }

  async trend() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), page: toInt(ctx.query.page) || 1 };
    query.order = 'repos_updated_at';
    ctx.body = await ctx.service.repos.list(query);
  }

  async recommend() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit) };
    ctx.body = await ctx.service.repos.findRecommend(query);
  }

  async count() {
    const ctx = this.ctx;
    const repos = await ctx.service.repos.count();
    const developers = await ctx.service.developer.count();
    ctx.body = { repos, developers };
  }

}

module.exports = ReposController;
