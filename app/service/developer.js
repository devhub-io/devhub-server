'use strict';

const Service = require('egg').Service;

const ENABLE = 1;

class DeveloperService extends Service {
  async findBySlug(slug) {
    const Op = this.app.Sequelize.Op;
    const developer = await this.ctx.model.Developer.findOne({
      where: {
        login: slug,
        status: ENABLE,
      },
    });
    if (!developer) {
      this.ctx.throw(404, 'repos not found');
    }

    // view number TODO

    const owner_repos = await this.ctx.model.Repos.findAll({
      attributes: [ 'id', 'slug', 'title', 'cover', 'description', 'stargazers_count', 'trends' ],
      where: {
        owner: developer.login,
        status: ENABLE,
      },
      order: [
        [ 'stargazers_count', 'DESC' ],
      ],
    });

    const contribute_repos = await this.ctx.model.ReposContributor.findAll({
      include: [{
        model: this.ctx.model.Repos,
        as: 'repos',
        attributes: [ 'slug', 'title', 'cover', 'description', 'stargazers_count', 'trends' ],
        where: {
          status: ENABLE,
          owner: {
            [Op.ne]: slug,
          },
        },
      }],
      attributes: [ 'repos_id' ],
      where: {
        login: slug,
      },
    });

    const developer_languages = await this.ctx.model.DeveloperLanguage.findAll({
      attributes: [ 'language', 'bytes' ],
      where: {
        developer_id: developer.id,
      },
      order: [
        [ 'bytes', 'DESC' ],
      ],
    });

    return { developer, owner_repos, contribute_repos, developer_languages };
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
