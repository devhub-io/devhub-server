'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async star() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    data.user_id = ctx.user.id;
    ctx.body = { status: await ctx.service.user.star(data) };
  }

  async stars() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.user_id = ctx.user.id;
    ctx.body = await ctx.service.user.stars(query);
  }

}

module.exports = UserController;
