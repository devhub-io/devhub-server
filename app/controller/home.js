'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    // this.app.queue.add({ job: 'reposFetch', data: { url: 'https://github.com/heroku/hatchet' } });
    // this.app.queue.add({ job: 'developerFetch', data: { url: 'https://github.com/sysatom' } });
    // console.log(this.app.passport);
    // console.log(this.ctx.isAuthenticated());
    // console.log(this.ctx.user);

    // this.ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: 'https://desktop.github.com/' } });
    // this.ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: 'https://desktop.github.com/terms/' } });
    // this.ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: 'https://github.com/desktop/desktop' } });
    // this.ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: 'https://github.com/desktop' } });
    // const a = await this.ctx.service.api.smmsImageUpload(__dirname + '/node.png');
    // console.log(a);
    // this.service.message.send({ type: 'error', message: 'error' });

    this.ctx.body = this.config.name;
  }

  async link() {
    let url = this.ctx.query.target || '';
    if (url && url.length > 0) {
      url = decodeURIComponent(url);
      await this.ctx.model.LinkClick.create({
        target: url,
        referer: this.ctx.request.get('referer'),
        ip: this.ctx.helper.ip(),
        user_agent: this.ctx.request.get('user-agent'),
        clicked_at: new Date(),
      });
      this.ctx.redirect(url, 302);
    } else {
      this.ctx.redirect('/', 302);
    }
  }

}

module.exports = HomeController;
