'use strict';

const Service = require('egg').Service;

class MessageService extends Service {

  async send({ type, title, message }) {
    this.app.io.of('/').emit('message', this.ctx.helper.parseMsg('message', { type, title, message }));
    this.app.logger.info('[system] Socket.io #message', JSON.stringify({ type, title, message }));
    return true;
  }

}

module.exports = MessageService;
