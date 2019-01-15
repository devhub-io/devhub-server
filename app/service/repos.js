'use strict';

const Service = require('egg').Service;
const moment = require('moment');

function toDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

class ReposService extends Service {

  async findBySlug(slug) {
    const ctx = this.ctx;
    const repos = await ctx.model.Repos.findOne({
      where: {
        slug,
      },
    });
    if (!repos) {
      this.ctx.throw(404, 'repos not found');
    }

    // PV
    const clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    const k = await this.app.redis.get(`devhub:repos:${repos.id}:pv:${clientIP}`);
    if (!k) {
      await this.app.redis.set(`devhub:repos:${repos.id}:pv:${clientIP}`, 1);
      await this.app.redis.expire(`devhub:repos:${repos.id}:pv:${clientIP}`, 24 * 60 * 60);
      repos.view_number = repos.view_number + 1;
      repos.save();
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
    let dependencies = await ctx.model.ReposDependency.findAll({
      attributes: [ 'source', 'env', 'package', 'version' ],
      where: {
        repos_id: repos.id,
      },
    });
    const deps = {};
    dependencies.forEach(i => {
      if (i.source in deps) {
        if (i.env in deps[i.source]) {
          deps[i.source][i.env].push(i);
        } else {
          deps[i.source][i.env] = [ i ];
        }
      } else {
        deps[i.source] = {};
        deps[i.source][i.env] = [ i ];
      }
    });
    dependencies = deps;

    const searchRes = await this.search({ keyword: repos.repo, limit: 5, page: 1 });
    let related = 'rows' in searchRes ? searchRes.rows : [];
    const tempRelated = [];
    related.forEach(i => {
      if (i.id !== repos.id) {
        tempRelated.push(i);
      }
    });
    related = tempRelated;

    return { repos, tags, contributors, languages, badges, questions, news, packages, topics, dependencies, related };
  }

  // Hottest -> stargazers_count
  // Newest -> repos_created_at
  // Trend -> repos_updated_at
  async list({ limit = 5, page = 1, order = 'stargazers_count' }) {
    page = page >= 1000 ? 1000 : page;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Repos.findAndCountAll({
      attributes: [ 'id', 'title', 'slug', 'cover', 'trends',
        'stargazers_count', 'description', 'owner', 'repo' ],
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
    return await this.ctx.model.Repos.findAll({
      attributes: [ 'id', 'title', 'slug', 'cover' ],
      where: {
        is_recommend: true,
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

  async search({ keyword, limit = 10, page = 1 }) {
    const app = this.app;
    try {
      const result = await app.elasticsearch.search({
        index: app.config.elasticsearch.index,
        type: 'repos',
        body: {
          size: limit,
          from: (page - 1) * limit,
          query: {
            bool: {
              should: [
                {
                  match: {
                    title: keyword,
                  },
                },
                {
                  match: {
                    description: keyword,
                  },
                },
              ],
            },
          },
          sort: [
            {
              stargazers_count: {
                order: 'desc',
              },
            },
            {
              repos_updated_at: {
                order: 'desc',
              },
            },
          ],
        },
      });
      if (result.hits) {
        const count = result.hits.total;
        const rows = [];
        result.hits.hits.forEach(item => {
          rows.push(item._source);
        });
        const last_page = Math.ceil(count / limit);
        return { rows, count, last_page, page };
      }
    } catch (e) {
      app.logger.warn(`[system] Search ${e.message}`);
    }
    return { rows: [], count: 0, last_page: 1, page: 1 };
  }

  async collections({ limit = 3, page = 1 }) {
    const offset = (page - 1) * limit;
    return await this.ctx.model.Collection.findAndCountAll({
      attributes: [ 'id', 'slug', 'title', 'image' ],
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
    console.log(date);
    const result = await this.ctx.model.ReposNews.findAndCountAll({
      attributes: [ 'url', 'title', 'score', 'post_date', 'item_id' ],
      // TODO
      // include: [{
      //   model: this.ctx.model.Repos,
      //   as: 'repos',
      //   attributes: [ 'title', 'slug', 'cover', 'description', 'stargazers_count', 'owner', 'repo' ],
      // }],
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

  async createFromGithubAPI(id, data) {
    const owner = data.owner.login;
    const repo = data.name;
    const slug = `${owner}-${repo}`;

    const find = await this.ctx.model.Repos.findOne({
      attributes: [ 'id' ],
      where: {
        slug,
      },
    });

    if (find) {
      return false;
    }
    return await this.ctx.model.Repos.create({
      user_id: id,
      title: data.name,
      slug,
      description: data.description !== undefined && data.description !== null ? data.description.substring(0, 254) : '',
      language: data.language || '',
      homepage: data.homepage || '',
      github: data.html_url || '',
      stargazers_count: data.stargazers_count || 0,
      watchers_count: data.watchers_count || 0,
      open_issues_count: data.open_issues_count || 0,
      forks_count: data.forks_count || 0,
      subscribers_count: data.subscribers_count || 0,
      repos_created_at: data.created_at,
      repos_updated_at: data.updated_at,
      fetched_at: new Date(),
      category_id: 0,
      readme: '',
      issue_response: 0,
      is_recommend: false,
      owner,
      repo,
      cover: data.owner.avatar_url || '',
      // fork: TODO
    });
  }

  async collection(slug) {
    const collection = await this.ctx.model.Collection.findOne({
      attributes: [ 'id', 'title', 'slug', 'image' ],
      where: {
        slug,
      },
    });
    if (!collection) {
      this.ctx.throw(404, 'collection not found');
    }
    const repos = await this.ctx.model.CollectionRepos.findAll({
      include: [{
        model: this.ctx.model.Repos,
        attributes: [ 'id', 'title', 'slug', 'cover', 'trends',
          'stargazers_count', 'description', 'owner', 'repo' ],
        as: 'repos',
        order: [
          [ 'sort', 'ASC' ],
        ],
      }],
      attributes: [ 'sort' ],
      where: {
        collection_id: collection.id,
      },
    });
    return { collection, repos };
  }

  async category({ limit = 5, page = 1, slug }) {
    const category = await this.ctx.model.Category.findOne({
      attributes: [ 'id', 'title', 'slug', 'parent_id' ],
      where: {
        slug,
      },
    });
    if (!category) {
      this.ctx.throw(404, 'category not found');
    }
    let foundCategoryId = -1;
    let childCategory = [];
    if (category.parent_id === 0) {
      childCategory = await this.ctx.model.Category.findAll({
        attributes: [ 'id', 'title', 'slug', 'parent_id' ],
        where: {
          parent_id: category.id,
        },
      });

      if (childCategory.length > 0) {
        foundCategoryId = childCategory[0].id;
      } else {
        foundCategoryId = category.id;
        childCategory = [ category ];
      }
    } else {
      childCategory = await this.ctx.model.Category.findAll({
        attributes: [ 'id', 'title', 'slug', 'parent_id' ],
        where: {
          parent_id: category.parent_id,
        },
      });

      foundCategoryId = category.id;
    }

    page = page >= 1000 ? 1000 : page;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Repos.findAndCountAll({
      attributes: [ 'id', 'title', 'slug', 'cover', 'trends',
        'stargazers_count', 'description', 'owner', 'repo' ],
      limit,
      offset,
      where: {
        category_id: foundCategoryId,
      },
      order: [
        [ 'stargazers_count', 'DESC' ],
      ],
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    result.category = childCategory;
    return result;
  }

  async review({ slug, reliable, recommendation, documentation, user_agent, ip }) {
    const repos = await this.ctx.model.Repos.findOne({
      attributes: [ 'id' ],
      where: {
        slug,
      },
    });
    if (!repos) {
      return false;
    }
    const vote = await this.ctx.model.ReposVote.findOne({
      where: {
        repos_id: repos.id,
        ip,
        user_agent,
      },
    });
    if (!vote) {
      await this.ctx.model.ReposVote.create({
        repos_id: repos.id,
        reliable,
        recommendation,
        documentation,
        ip,
        user_agent,
      });
      return true;
    }
    return false;
  }

}

module.exports = ReposService;
