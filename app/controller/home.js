'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = await this.ctx.service.repos.listPaginate({ page: 11, limit: 2, order: 'stargazers_count' });
    this.ctx.body = await this.ctx.service.repos.count();
  }
}

module.exports = HomeController;
