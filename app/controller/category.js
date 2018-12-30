'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async topColumn() {
    this.ctx.body = await this.ctx.service.repos.topColumn();
  }
}

module.exports = CategoryController;
