'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    // this.app.queue.add({ job: 'reposFetch', data: { url: 'https://github.com/heroku/hatchet' } });
    // this.app.queue.add({ job: 'developerFetch', data: { url: 'https://github.com/sysatom' } });
    // console.log(this.app.passport);
    // console.log(this.ctx.isAuthenticated());
    // console.log(this.ctx.user);

    this.ctx.body = this.config.app_name;
  }

}

module.exports = HomeController;
