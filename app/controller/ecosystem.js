'use strict';

const Controller = require('egg').Controller;

class EcosystemController extends Controller {

  async topics() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    ctx.body = await ctx.service.ecosystem.topics(query);
  }

}

module.exports = EcosystemController;
