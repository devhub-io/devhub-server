'use strict';

const Service = require('egg').Service;

class ReposService extends Service {
  async find(id) {
    const repos = await this.ctx.model.Repos.find(id);
    return repos;
  }
}

module.exports = ReposService;
