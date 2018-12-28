'use strict';

const Service = require('egg').Service;
const env = require('../../.env.js');
console.log(env.BEARYCHAT_WEBHOOK);

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
