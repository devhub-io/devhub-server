'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async topColumn() {
    this.ctx.body = await this.ctx.model.Category.findAll({
      where: {
        parent_id: 0,
      },
    });
  }
}

module.exports = CategoryController;
