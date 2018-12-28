'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const a = await this.service.message.send('Hello world');
    console.log(a);
    this.ctx.body = this.config.app_name;
  }
}

module.exports = HomeController;
