'use strict';

module.exports = {
  async remember(key, ttl, callback) {
    const cache = await this.app.redis.get(`devhub:${key}`);
    if (!cache) {
      const res = await callback();
      await this.app.redis.set(`devhub:${key}`, JSON.stringify(res));
      await this.app.redis.expire(`devhub:${key}`, ttl);
      return res;
    }
    return JSON.parse(cache);
  },
};
