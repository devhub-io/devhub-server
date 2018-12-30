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

  // Hottest -> stargazers_count
  // Newest -> repos_created_at
  // Trend -> repos_updated_at
  async list({ limit = 5, page = 1, order = 'stargazers_count' }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Repos.findAndCountAll({
      attributes: [ 'id', 'title', 'slug', 'cover', 'trends',
        'stargazers_count', 'description', 'owner', 'repo' ],
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
    result.last_page = Math.ceil(result.count / limit);
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

  // TODO
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
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async collections({ limit = 3, page = 1 }) {
    const offset = (page - 1) * limit;
    return await this.ctx.model.Collection.findAndCountAll({
      attributes: [ 'id', 'slug', 'title', 'image' ],
      where: {
        is_enable: ENABLE,
      },
      limit,
      offset,
      order: [
        [ 'sort', 'ASC' ],
      ],
    });
  }

  async topColumn() {
    return await this.ctx.model.Category.findAll({
      where: {
        parent_id: 0,
      },
    });
  }

  async topics() {
    const sequelize = this.app.Sequelize;
    return await this.ctx.model.ReposTopic.findAll({
      attributes: [[ sequelize.fn('COUNT', sequelize.col('*')), 'number' ], 'topic' ],
      limit: 1000,
      order: [
        [ sequelize.col('number'), 'DESC' ],
      ],
      group: [ 'topic' ],
    });
  }

}

module.exports = ReposService;
