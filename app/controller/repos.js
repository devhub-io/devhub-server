'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ReposController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Repos.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Repos.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { title, readme } = ctx.request.body;
    const repos = await ctx.model.Repos.create({ title, readme });
    ctx.status = 201;
    ctx.body = repos;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const repos = await ctx.model.Repos.findByPk(id);
    if (!repos) {
      ctx.status = 404;
      return;
    }

    const { title, readme } = ctx.request.body;
    await repos.update({ title, readme });
    ctx.body = repos;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const repos = await ctx.model.Repos.findByPk(id);
    if (!repos) {
      ctx.status = 404;
      return;
    }

    await repos.destroy();
    ctx.status = 200;
  }
}

module.exports = ReposController;
