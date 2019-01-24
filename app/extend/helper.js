'use strict';

const crypto = require('crypto');
const constant = require('../constant');

module.exports = {
  async remember(key, ttl, callback) {
    const cache = await this.app.redis.get(`devhub:${key}`);
    if (!cache) {
      const res = await callback();
      await this.app.redis.set(`devhub:${key}`, JSON.stringify(res));
      await this.app.redis.expire(`devhub:${key}`, ttl);
      return res;
    }
    try {
      return JSON.parse(cache);
    } catch (e) {
      return cache;
    }
  },

  async setCache(key, ttl, value) {
    await this.app.redis.set(`devhub:${key}`, value);
    return await this.app.redis.expire(`devhub:${key}`, ttl);
  },

  async getCache(key) {
    return await this.app.redis.get(`devhub:${key}`);
  },

  ip() {
    return this.ctx.ips.length > 0 ? this.ctx.ips[this.ctx.ips.length - 1] : this.ctx.ip;
  },

  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },

  randomString(len) {
    return crypto
      .randomBytes(Math.ceil((len * 3) / 4))
      .toString('base64')
      .slice(0, len)
      .replace(/\+/g, '0')
      .replace(/\//g, '0');
  },

  toSlug(title) {
    return title.replace('.', '').replace(' ', '').toLowerCase();
  },

  isGithubRepos(url) {
    return url.match(constant.REPOS_URL_REGEX);
  },

  isGithubDeveloper(url) {
    return url.match(constant.DEVELOPER_URL_REGEX);
  },

  isSite(url) {
    return url.match(/^http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2}))(?:$|\/)$/i);
  },

  isUrl(text) {
    return text.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i);
  },

};
