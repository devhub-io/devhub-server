'use strict';

const Service = require('egg').Service;
const env = require('../../.env.js');

class MessageService extends Service {

  async send(text) {
    const ctx = this.ctx;
    const result = await ctx.curl(env.BEARYCHAT_WEBHOOK, {
      method: 'POST',
      contentType: 'json',
      data: {
        text,
      },
      dataType: 'json',
    });

    return result.data;
  }

}

module.exports = MessageService;
