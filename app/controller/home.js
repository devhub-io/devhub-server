'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    this.ctx.body = this.config.name;
  }

  async link() {
    let url = this.ctx.query.target || '';
    if (url && url.length > 0) {
      url = decodeURIComponent(url);
      await this.ctx.model.LinkClick.create({
        target: url,
        referer: this.ctx.request.get('referer'),
        ip: this.ctx.helper.getIP(),
        user_agent: this.ctx.request.get('user-agent'),
        clicked_at: new Date(),
      });
      this.ctx.redirect(url, 302);
    } else {
      this.ctx.redirect('/', 302);
    }
  }

  async feedback() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    ctx.validate({
      email: {
        type: 'email',
      },
      message: {
        type: 'string',
      },
    });
    await ctx.service.user.feedback(data);
    ctx.body = { message: 'Feedback sent!' };
  }

}

module.exports = HomeController;
