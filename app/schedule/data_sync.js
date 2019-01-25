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
    const ctx = this.ctx;

    // Queue clean Fail Job
    const failJobs = await ctx.service.queue.cleanFailJob();
    await ctx.service.api.bearychatSendMessage(`[system] Data Sync #FailJob number: ${failJobs}`);

    // Collection items check
    const { reposItems, developersItems, sitesItems, linksItems } = await ctx.service.admin.ecosystemCollectionItemsCheck();
    await ctx.service.api.bearychatSendMessage(`[system] Data Sync #CollectionItemsCheck number: ${reposItems.length + developersItems.length + sitesItems.length + linksItems.length}`);

    // Queue clear Repeat Job
    const repeatJobs = await this.ctx.service.queue.cleanRepeatJob();
    await ctx.service.api.bearychatSendMessage(`[system] Data Sync #RepeatJob number: ${repeatJobs.length}`);

    // Push message
    await ctx.service.api.bearychatSendMessage('[system] Data Sync Done!');

    return true;
  }
}

module.exports = IndexSync;
