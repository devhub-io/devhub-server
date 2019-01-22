'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async users() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.name = ctx.query.name || '';
    query.email = ctx.query.email || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.users(query);
  }

  async queueJobs() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.queue = ctx.query.queue || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.queueJobs(query);
  }

  async sites() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.url = ctx.query.url || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.sites(query);
  }

  async links() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.url = ctx.query.url || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.links(query);
  }

  async wiki() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.url = ctx.query.url || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.wiki(query);
  }

  async news() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.post_date = ctx.query.post_date || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.news(query);
  }

  async articles() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.url = ctx.query.url || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.articles(query);
  }

  async repos() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.slug = ctx.query.slug || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.repos(query);
  }

  async reposSwitch() {
    const ctx = this.ctx;
    const query = { id: ctx.request.body.id, status: ctx.helper.toInt(ctx.request.body.status) };
    ctx.body = await ctx.service.admin.reposSwitch(query);
  }

  async reposEdit() {
    const ctx = this.ctx;
    const query = { id: ctx.helper.toInt(ctx.request.body.id), status: ctx.helper.toInt(ctx.request.body.status) };
    ctx.body = await ctx.service.admin.reposEdit(query);
  }

  async developers() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.login = ctx.query.login || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    query.type = ctx.query.type || '';
    ctx.body = await ctx.service.admin.developers(query);
  }

  async developerSwitch() {
    const ctx = this.ctx;
    const query = { id: ctx.request.body.id, status: ctx.helper.toInt(ctx.request.body.status) };
    ctx.body = await ctx.service.admin.developerSwitch(query);
  }

  async developerEdit() {
    const ctx = this.ctx;
    const query = { id: ctx.helper.toInt(ctx.request.body.id), status: ctx.helper.toInt(ctx.request.body.status) };
    ctx.body = await ctx.service.admin.developerEdit(query);
  }

  async ecosystems() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    query.slug = ctx.query.slug || '';
    ctx.body = await ctx.service.admin.ecosystems(query);
  }

  async ecosystemSwitch() {
    const ctx = this.ctx;
    const query = { id: ctx.request.body.id, status: ctx.helper.toInt(ctx.request.body.status) };
    ctx.body = await ctx.service.admin.ecosystemSwitch(query);
  }

  async ecosystemEdit() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemEdit(data);
  }

  async ecosystemCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCreate(data);
  }

  async ecosystemCollectionCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionCreate(data);
  }

  async ecosystemCollectionEdit() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionEdit(data);
  }

  async ecosystemCollectionDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionDelete(data);
  }

  async ecosystemCollections() {
    const ctx = this.ctx;
    const query = { id: ctx.query.id };
    ctx.body = await ctx.service.admin.ecosystemCollections(query);
  }

  async ecosystemCollectionItems() {
    const ctx = this.ctx;
    const query = { id: ctx.query.id };
    ctx.body = await ctx.service.admin.ecosystemCollectionItems(query);
  }

  async ecosystemCollectionItemSwitch() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionItemSwitch(data);
  }

  async ecosystemCollectionItemCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionItemCreate(data);
  }

  async ecosystemCollectionItemEdit() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionItemEdit(data);
  }

  async ecosystemCollectionItemDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionItemDelete(data);
  }

  async ecosystemCollectionFetch() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionFetch(data);
  }

  async apiSearch() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit), page: ctx.helper.toInt(ctx.query.page) || 1 };
    const type = ctx.query.type || '';
    query.keywords = ctx.query.keywords || '';
    if (type === 'repos') {
      ctx.body = await ctx.service.admin.users(query);
    } else if (type === 'developers') {
      ctx.body = [];
    } else {
      ctx.body = [];
    }
  }

  async queueReplay() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.queueReplay(data);
  }

  async queueDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.queueDelete(data);
  }

  async fetch() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.fetch(data);
  }

  async ecosystemCollectionSwitch() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionSwitch(data);
  }

  async ecosystemCollectionMove() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionMove(data);
  }

}

module.exports = HomeController;
