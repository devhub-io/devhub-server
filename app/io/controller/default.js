'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {

  async ping() {
    const { ctx } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('pong', `Hi, ${message}`);
  }

}

module.exports = DefaultController;
