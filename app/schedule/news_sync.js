'use strict';

const Subscription = require('egg').Subscription;

class NewsSync extends Subscription {

  static get schedule() {
    return {
      interval: '1h',
      type: 'worker',
    };
  }

  async subscribe() {
    const ctx = this.ctx;
    const base = 'https://hacker-news.firebaseio.com';
    const endpoints = {
      top: '/v0/topstories.json',
      new: '/v0/newstories.json',
    };

    let newsCount = 0;

    for (const endpointsKey in endpoints) {
      let items;
      try {
        const res = await ctx.curl(base + endpoints[endpointsKey], {
          dataType: 'json',
          timeout: 60000,
        });
        items = res.data;
      } catch (e) {
        items = [];
      }
      for (let i = 0; i < items.length; i++) {
        try {
          ctx.service.queue.addJob({ queue: 'newsFetch', payload: { item_id: items[i] } });
          newsCount = newsCount + 1;
        } catch (e) {
          this.app.logger.error(e);
        }
      }
    }

    return newsCount;
  }
}

module.exports = NewsSync;
