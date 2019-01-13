'use strict';

const Controller = require('egg').Controller;

class ReposController extends Controller {

  async find() {
    const ctx = this.ctx;
    const slug = ctx.params.slug;
    this.ctx.body = await ctx.service.repos.findBySlug(slug);
  }

  async hottest() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.order = 'stargazers_count';
    ctx.body = await ctx.service.repos.list(query);
  }

  async newest() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.order = 'repos_created_at';
    ctx.body = await ctx.service.repos.list(query);
  }

  async trend() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.order = 'repos_updated_at';
    ctx.body = await ctx.service.repos.list(query);
  }

  async recommend() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) };
    ctx.body = await ctx.service.repos.findRecommend(query);
  }

  async collections() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    ctx.body = await ctx.service.repos.collections(query);
  }

  async collection() {
    const ctx = this.ctx;
    const slug = ctx.params.slug;
    ctx.body = await ctx.service.repos.collection(slug);
  }

  async category() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1, slug: ctx.params.slug };
    ctx.body = await ctx.service.repos.category(query);
  }

  async count() {
    const ctx = this.ctx;
    const repos = await ctx.helper.remember('api:count:repos', 7 * 24 * 60 * 60, async () => {
      return await ctx.service.repos.count();
    });
    const developers = await ctx.helper.remember('api:count:developers', 7 * 24 * 60 * 60, async () => {
      return await ctx.service.developer.count();
    });
    ctx.body = { repos, developers };
  }

  async topics() {
    const ctx = this.ctx;
    ctx.body = await ctx.helper.remember('api:topics', 7 * 24 * 60 * 60, async () => {
      return await ctx.service.repos.topics();
    });
  }

  async topicInPaginate() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 5, page: ctx.helper.toInt(ctx.query.page) || 1, topic: ctx.params.topic };
    ctx.body = await ctx.service.repos.topicInPaginate(query);
  }

  async news() {
    const ctx = this.ctx;
    const query = { date: ctx.query.date };
    ctx.body = await ctx.service.repos.news(query);
  }

  async sites() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.repos.sites();
  }

  async home() {
    const ctx = this.ctx;
    const query = { limit: 5, page: 1 };
    query.order = 'stargazers_count';
    const hottest = await ctx.helper.remember('api:home:hottest', 7 * 24 * 60 * 60, async () => {
      return await ctx.service.repos.list(query);
    });

    query.order = 'repos_created_at';
    const newest = await ctx.helper.remember('api:home:newest', 24 * 60 * 60, async () => {
      return await ctx.service.repos.list(query);
    });

    query.order = 'repos_updated_at';
    const trend = await ctx.helper.remember('api:home:trend', 2 * 60 * 60, async () => {
      return await ctx.service.repos.list(query);
    });

    const recommend = await ctx.helper.remember('api:home:recommend', 7 * 24 * 60 * 60, async () => {
      return await ctx.service.repos.findRecommend(query);
    });

    query.limit = 3;
    const collections = await ctx.helper.remember('api:home:collections', 7 * 24 * 60 * 60, async () => {
      return await ctx.service.repos.collections(query);
    });

    ctx.body = { hottest, newest, trend, recommend, collections };
  }

  async review() {
    const ctx = this.ctx;
    const query = {
      slug: ctx.params.slug,
      reliable: ctx.request.body.reliable || 0,
      recommendation: ctx.request.body.recommendation || 0,
      documentation: ctx.request.body.documentation || 0,
      user_agent: ctx.request.headers['user-agent'],
      ip: ctx.helper.ip(),
    };
    const status = await ctx.service.repos.review(query);
    ctx.body = { status };
  }

  async search() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1, keyword: ctx.query.keyword };
    ctx.body = await ctx.service.repos.search(query);
  }

}

module.exports = ReposController;
