'use strict';

const Subscription = require('egg').Subscription;

class IndexSync extends Subscription {

  static get schedule() {
    return {
      interval: '1d',
      type: 'worker',
    };
  }

  async subscribe() {
    // const app = this.app;
    // const ctx = this.ctx;

    // queue TODO


    return true;
  }
}

module.exports = IndexSync;
