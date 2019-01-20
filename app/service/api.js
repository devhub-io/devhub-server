'use strict';

const Service = require('egg').Service;
const env = require('../../.env');
const formstream = require('formstream');

class ApiService extends Service {

  async librariesioReposSearch({ keywords, page = 1, limit = 10 }) {
    const res = await this.ctx.curl(`https://libraries.io/api/search?q=${keywords}&page=${page}&per_page=${limit}&api_key=${env.LIBRARIESIO_KEY}`, {
      dataType: 'json',
      timeout: 60000,
    });
    if (res.status === 200) {
      return res.data;
    }
    return [];
  }

  async smmsImageUpload(filePath) {
    const ctx = this.ctx;
    const form = new formstream();
    form.file('smfile', filePath);
    const result = await ctx.curl('https://sm.ms/api/upload', {
      method: 'POST',
      stream: form,
      dataType: 'json',
      headers: form.headers(),
    });
    if (result.status === 200 && result.data.code === 'success') {
      return result.data.data.url;
    }
    return false;
  }

  async bearychatSendMessage(message) {
    const res = await this.ctx.curl(env.BEARYCHAT_WEBHOOK, {
      method: 'POST',
      contentType: 'json',
      data: {
        text: message,
      },
      dataType: 'json',
    });
    return res.status === 200 && res.data.code === 0;
  }

}

module.exports = ApiService;
