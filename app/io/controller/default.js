'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {

  async ping() {
    const { ctx } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('pong', `Hi! I've got your message: ${message}`);
  }

}

module.exports = DefaultController;
