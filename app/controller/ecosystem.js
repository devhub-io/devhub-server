'use strict';

const Controller = require('egg').Controller;

class EcosystemController extends Controller {

  async topics() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    ctx.body = await ctx.service.ecosystem.topics(query);
  }

  async find() {
    const ctx = this.ctx;
    const slug = ctx.params.slug;
    this.ctx.body = await ctx.service.ecosystem.findBySlug(slug);
  }

  async collections() {
    const ctx = this.ctx;
    const slug = ctx.params.slug;
    this.ctx.body = await ctx.service.ecosystem.collections(slug);
  }

  async items() {
    const ctx = this.ctx;
    const topic_slug = ctx.params.topic_slug;
    const collection_slug = ctx.params.collection_slug;
    this.ctx.body = await ctx.service.ecosystem.items(topic_slug, collection_slug);
  }

}

module.exports = EcosystemController;
