'use strict';

const Service = require('egg').Service;
const moment = require('moment');

const ENABLE = 1;

function toDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

class ReposService extends Service {
  async findBySlug(slug) {
    const ctx = this.ctx;
    const repos = await ctx.model.Repos.findOne({
      where: {
        slug,
        status: ENABLE,
      },
    });
    if (!repos) {
      this.ctx.throw(404, 'repos not found');
    }

    const tags = await ctx.model.ReposTag.findAll({
      where: {
        repos_id: repos.id,
      },
    });
    const contributors = await ctx.model.ReposContributor.findAll({
      where: {
        repos_id: repos.id,
      },
    });
    const languages = await ctx.model.ReposLanguage.findAll({
      where: {
        repos_id: repos.id,
      },
    });
    const badges = await ctx.model.ReposBadge.findAll({
      where: {
        repos_id: repos.id,
      },
    });
    const questions = await ctx.model.ReposQuestion.findAll({
      where: {
        repos_id: repos.id,
      },
    });
    const news = await ctx.model.ReposNews.findAll({
      where: {
        repos_id: repos.id,
      },
    });
    const packages = await ctx.model.Package.findAll({
      where: {
        repos_id: repos.id,
      },
    });
    const topics = await ctx.model.ReposTopic.findAll({
      where: {
        repos_id: repos.id,
      },
    });
    const dependencies = await ctx.model.ReposDependency.findAll({
      where: {
        repos_id: repos.id,
      },
    });

    // relatedRepos TODO

    return { repos, tags, contributors, languages, badges, questions, news, packages, topics, dependencies };
  }

  // Hottest -> stargazers_count
  // Newest -> repos_created_at
  // Trend -> repos_updated_at
  async list({ limit = 5, page = 1, order = 'stargazers_count' }) {
    const Op = this.app.Sequelize.Op;
    page = page >= 1000 ? 1000 : page;
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
    page = page >= 1000 ? 1000 : page;
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

  async topicInPaginate({ limit = 5, page = 1, topic }) {
    const topicExplan = await this.ctx.model.TopicExplain.findOne({
      attributes: [[ 'explain', 'text' ]],
      where: {
        topic,
      },
    });
    page = page >= 1000 ? 1000 : page;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Repos.findAndCountAll({
      attributes: [ 'slug', 'title', 'description', 'cover', 'stargazers_count', 'trends' ],
      include: [{
        model: this.ctx.model.ReposTopic,
        as: 'topic',
        attributes: [[ 'topic', 'name' ]],
        where: {
          topic,
        },
      }],
      where: {
        status: ENABLE,
      },
      order: [
        [ 'stargazers_count', 'DESC' ],
      ],
      limit,
      offset,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    result.explain = topicExplan;
    return result;
  }

  async news({ date = '' }) {
    const Op = this.app.Sequelize.Op;
    date = date || toDate(new Date());
    const result = await this.ctx.model.ReposNews.findAndCountAll({
      attributes: [ 'url', 'title', 'score', 'post_date', 'item_id' ],
      include: [{
        model: this.ctx.model.Repos,
        as: 'repos',
        attributes: [ 'title', 'slug', 'cover', 'description', 'stargazers_count', 'owner', 'repo' ],
        where: {
          status: ENABLE,
        },
      }],
      where: {
        post_date: date,
      },
      order: [
        [ 'score', 'DESC' ],
      ],
    });

    const next = await this.ctx.model.ReposNews.findOne({
      attributes: [ 'post_date' ],
      where: {
        post_date: {
          [Op.gt]: date,
        },
      },
      order: [
        [ 'post_date', 'ASC' ],
      ],
    });
    const prev = await this.ctx.model.ReposNews.findOne({
      attributes: [ 'post_date' ],
      where: {
        post_date: {
          [Op.lt]: date,
        },
      },
      order: [
        [ 'post_date', 'DESC' ],
      ],
    });
    result.next = next;
    result.prev = prev;

    return result;
  }

  async sites() {
    const sites = await this.ctx.model.Site.findAll({
      attributes: [ 'title', 'url', 'category', 'icon', 'description' ],
      where: {
        is_enable: ENABLE,
        level: 1,
      },
      order: [
        [ 'category', 'ASC' ],
        [ 'sort', 'ASC' ],
      ],
    });

    const result = {};
    sites.forEach(i => {
      if (!(i.category in result)) {
        result[i.category] = [];
      }
      result[i.category].push(i);
    });

    return result;
  }

}

module.exports = ReposService;
