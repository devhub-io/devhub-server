'use strict';

const Service = require('egg').Service;

const ENABLE = 1;

class ReposService extends Service {
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

  async list({ limit = 5, order = 'stargazers_count' }) {
    const Op = this.app.Sequelize.Op;
    // Hottest -> stargazers_count
    // Newest -> repos_created_at
    // Trend -> repos_updated_at
    return await this.ctx.model.Repos.findAll({
      attributes: [ 'id', 'title', 'slug', 'cover', 'trends',
        'stargazers_count', 'description', 'owner', 'repo' ],
      where: {
        status: ENABLE,
        cover: {
          [Op.ne]: '',
        },
      },
      limit,
      order: [
        [ order, 'DESC' ],
      ],
    });
  }

  async listPaginate({ limit = 5, page = 1, order = 'stargazers_count' }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Repos.findAndCountAll({
      attributes: [ 'id', 'title', 'slug', 'cover', 'trends', 'stargazers_count', 'description' ],
      where: {
        status: ENABLE,
        cover: {
          [Op.ne]: '',
        },
      },
      limit,
      offset,
      order: [
        [ order, 'DESC' ],
      ],
    });
    result.page = page;
    return result;
  }

  async findRecommend({ limit = 10 }) {
    const Op = this.app.Sequelize.Op;
    return await this.ctx.model.Repos.findAll({
      attributes: [ 'id', 'title', 'slug', 'cover' ],
      where: {
        status: ENABLE,
        is_recommend: true,
        cover: {
          [Op.ne]: '',
        },
      },
      limit,
      order: [
        [ 'stargazers_count', 'DESC' ],
      ],
    });
  }

  async count() {
    return await this.ctx.model.Repos.count();
  }

  async search({ keyword = '', limit = 10 }) {
    console.log(keyword);
    console.log(limit);
  }

  async findWhereInPaginate({ limit = 5, page = 1, order = 'stargazers_count' }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Repos.findAndCountAll({
      attributes: [ 'id', 'slug', 'cover', 'title', 'description', 'trends', 'stargazers_count' ],
      where: {
        status: ENABLE,
        cover: {
          [Op.ne]: '',
        },
      },
      limit,
      offset,
      order: [
        [ order, 'DESC' ],
      ],
    });
    result.page = page;
    return result;
  }

}

module.exports = ReposService;
