'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async users() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.name = ctx.query.name || '';
    query.email = ctx.query.email || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.users(query);
  }

  async queueJobs() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.queue = ctx.query.queue || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.queueJobs(query);
  }

  async sites() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.url = ctx.query.url || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.sites(query);
  }

  async links() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.url = ctx.query.url || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.links(query);
  }

  async wiki() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.url = ctx.query.url || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.wiki(query);
  }

  async news() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.post_date = ctx.query.post_date || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.news(query);
  }

  async articles() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.title = ctx.query.title || '';
    query.url = ctx.query.url || '';
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.articles(query);
  }

  async click() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.target = ctx.query.target || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.click(query);
  }

  async vote() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.repos_id = ctx.query.repos_id || '';
    query.sort_type = ctx.query.sort_type || '';
    ctx.body = await ctx.service.admin.vote(query);
  }

  async repos() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
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

  async reposEnable() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.admin.reposEnable();
  }

  async developers() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
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

  async developerEnable() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.admin.developerEnable();
  }

  async ecosystems() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
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

  async ecosystemCollectionItemCheck() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.admin.ecosystemCollectionItemCheck();
  }

  async ecosystemSource() {
    const ctx = this.ctx;
    const query = { id: ctx.query.id };
    ctx.body = await ctx.service.admin.ecosystemSource(query);
  }

  async ecosystemSourceCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemSourceCreate(data);
  }

  async ecosystemSourceDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemSourceDelete(data);
  }

  async ecosystemSourceFetch() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemSourceFetch(data);
  }

  async ecosystemAttributes() {
    const ctx = this.ctx;
    const query = { id: ctx.query.id };
    ctx.body = await ctx.service.admin.ecosystemAttributes(query);
  }

  async ecosystemAttributeCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemAttributeCreate(data);
  }

  async ecosystemAttributeEdit() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemAttributeEdit(data);
  }

  async ecosystemAttributeDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemAttributeDelete(data);
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

  async ecosystemCollectionImport() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionImport(data);
  }

  async apiSearch() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    const type = ctx.query.type || '';
    query.keywords = ctx.query.keywords || '';
    if (type === 'repos') {
      ctx.body = [];
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

  async queueReplayAll() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.admin.queueReplayAll();
  }

  async queueDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.queueDelete(data);
  }

  async queueBullCounts() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.admin.queueBullCounts();
  }

  async queueBullClean() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.queueBullClean(data);
  }

  async queueSystemClean() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.queueSystemClean(data);
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

  async ecosystemCollectionCrawler() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.ecosystemCollectionCrawler(data);
  }

  async websiteAnalytics() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.api.cloudflareDashboard();
  }

  async userAnalytics() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.admin.userAnalytics();
  }

  async ecosystemAnalytics() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.admin.ecosystemAnalytics();
  }

  async feedback() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.status = ctx.query.status || '';
    query.sort_type = ctx.query.sort_type || '';
    query.tags = ctx.query.tags || '';
    ctx.body = await ctx.service.admin.feedback(query);
  }

  async feedbackSwitch() {
    const ctx = this.ctx;
    const query = { id: ctx.request.body.id, status: ctx.helper.toInt(ctx.request.body.status) };
    ctx.body = await ctx.service.admin.feedbackSwitch(query);
  }

  async feedbackDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.feedbackDelete(data);
  }

  async config() {
    const ctx = this.ctx;
    const query = { limit: ctx.helper.toInt(ctx.query.limit) || 10, page: ctx.helper.toInt(ctx.query.page) || 1 };
    query.key = ctx.query.key || '';
    ctx.body = await ctx.service.admin.config(query);
  }

  async configCreate() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.configCreate(data);
  }

  async configEdit() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.configEdit(data);
  }

  async configDelete() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.body = await ctx.service.admin.configDelete(data);
  }

}

module.exports = AdminController;
