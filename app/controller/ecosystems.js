'use strict';

const Controller = require('egg').Controller;

class EcosystemsController extends Controller {

  async topics() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    ctx.body = await ctx.service.ecosystems.topics(query);
  }

}

module.exports = EcosystemsController;
