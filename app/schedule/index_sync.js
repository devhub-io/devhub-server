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
    const app = this.app;
    const ctx = this.ctx;

    try {
      await app.elasticsearch.ping({
        requestTimeout: 60000,
      });

      await app.elasticsearch.indices.create({
        index: app.config.elasticsearch.index,
      });
    } catch (e) {
      app.logger.warn(`[system] Index Sync ${e.message}`);
    }

    const count = await ctx.model.Repos.count();
    const limit = 10000;
    const lastPage = Math.ceil(count / limit);
    for (let page = 1; page <= lastPage; page++) {
      const offest = (page - 1) * limit;
      const repos = await ctx.model.Repos.findAll({
        attributes: [ 'id', 'title', 'slug', 'description', 'language', 'stargazers_count', 'watchers_count',
          'open_issues_count', 'forks_count', 'subscribers_count', 'issue_response', 'status', 'repos_created_at',
          'repos_updated_at', 'view_number', 'cover', 'owner', 'repo', 'trends' ],
        limit,
        offest,
        order: [
          [ 'id', 'ASC' ],
        ],
      });

      const bulk = [];
      repos.forEach(i => {
        bulk.push({
          index: {
            _index: app.config.elasticsearch.index,
            _type: 'repos',
            _id: i.id,
          },
        });
        bulk.push(JSON.parse(JSON.stringify(i)));
      });

      try {
        await app.elasticsearch.bulk({
          body: bulk,
        });
      } catch (e) {
        app.logger.warn(`[system] Index Sync ${e.message}`);
      }

      app.logger.info(`[system] Index Sync page ${page}`);
    }

    // Push message
    await ctx.service.api.bearychatSendMessage('[system] Index Sync Done!');

    return true;
  }
}

module.exports = IndexSync;
