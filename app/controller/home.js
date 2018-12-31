'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    this.ctx.body = this.config.app_name;
  }

}

module.exports = HomeController;
