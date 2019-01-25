'use strict';

const Service = require('egg').Service;

class MessageService extends Service {

  async send({ type, message }) {
    this.app.io.of('/').emit('message', this.ctx.helper.parseMsg('message', { type, message }));
    this.app.logger.info('[system] Socket.io #message', { type, message });
    return true;
  }

}

module.exports = MessageService;
