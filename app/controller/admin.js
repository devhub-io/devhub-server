'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

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
    ctx.body = await ctx.service.admin.repos(query);
  }

}

module.exports = HomeController;
