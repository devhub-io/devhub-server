'use strict';

const Controller = require('egg').Controller;

class DeveloperController extends Controller {

  async list() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1, type: ctx.query.type || 'User' };
    this.ctx.body = await ctx.service.developer.list(query);
  }

  async find() {
    const ctx = this.ctx;
    const slug = ctx.params.slug;
    this.ctx.body = await ctx.service.developer.findBySlug(slug);
  }

}

module.exports = DeveloperController;
