'use strict';

const Service = require('egg').Service;
const env = require('../../.env');
const formstream = require('formstream');
const fs = require('fs');

class ApiService extends Service {

  async librariesioReposSearch({ keywords, page = 1, limit = 10 }) {
    const res = await this.ctx.curl(`https://libraries.io/api/search?q=${keywords}&page=${page}&per_page=${limit}&api_key=${env.LIBRARIESIO_KEY}`, {
      dataType: 'json',
    });
    if (res.status === 200) {
      return res.data;
    }
    return [];
  }

  async smmsImageUpload(filePath) {
    if (fs.existsSync(filePath)) {
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

  async wikipeidaSummery(title) {
    const res = await this.ctx.curl(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${title}`, {
      dataType: 'json',
    });
    if (res.status === 200 && res.data.query) {
      const key = Object.keys(res.data.query.pages);
      if (key.length > 0) {
        return res.data.query.pages[key[0]].extract;
      }
    }
    return false;
  }

}

module.exports = ApiService;
