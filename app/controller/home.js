'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const query = { limit: 1, offset: 0 };
    this.ctx.body = await this.ctx.model.ArticleUrl.findAll(query);
  }
}

module.exports = HomeController;
