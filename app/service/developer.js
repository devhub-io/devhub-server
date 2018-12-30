'use strict';

const Service = require('egg').Service;

const ENABLE = 1;

class DeveloperService extends Service {
  async findBySlug(slug) {
    const repos = await this.ctx.model.Repos.find({
      where: {
        slug,
        status: ENABLE,
      },
    });
    if (!repos) {
      this.ctx.throw(404, 'repos not found');
    }
    return repos;
  }

  async list({ limit = 5, page = 1, type = 'User' }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Developer.findAndCountAll({
      where: {
        status: ENABLE,
        public_repos: {
          [Op.gt]: 0,
        },
        type,
      },
      limit,
      offset,
      order: [
        [ 'rating', 'DESC' ],
        [ 'followers', 'DESC' ],
      ],
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async count() {
    return await this.ctx.model.Developer.count();
  }

}

module.exports = DeveloperService;
