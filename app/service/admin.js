'use strict';

const Service = require('egg').Service;
const arrayToTree = require('array-to-tree');
const toc = require('markdown-toc');
const marked = require('marked');

class AdminService extends Service {

  async users({ limit, page, name, email, status, sort_type }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const where = {};
    if (name !== '') {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }
    if (email !== '') {
      where.email = email;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.User.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async queueJobs({ limit, page, queue, sort_type }) {
    const offset = (page - 1) * limit;
    const where = {};
    if (queue !== '') {
      where.queue = queue;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.QueueJob.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async sites({ limit, page, title, url, status, sort_type }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const where = {};
    if (title !== '') {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (url !== '') {
      where.url = url;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Site.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async links({ limit, page, title, url, status, sort_type }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const where = {};
    if (title !== '') {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (url !== '') {
      where.url = url;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Link.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async wiki({ limit, page, title, url, status, sort_type }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const where = {};
    if (title !== '') {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (url !== '') {
      where.url = url;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Wiki.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async news({ limit, page, title, post_date, status, sort_type }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const where = {};
    if (title !== '') {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (post_date !== '') {
      where.post_date = post_date;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.ReposNews.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async articles({ limit, page, title, url, status, sort_type }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const where = {};
    if (title !== '') {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (url !== '') {
      where.url = url;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Article.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async repos({ limit, page, slug, status, sort_type }) {
    const offset = (page - 1) * limit;
    const where = {};
    if (slug !== '') {
      where.slug = slug;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Repos.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async developers({ limit, page, login, status, sort_type, type }) {
    const offset = (page - 1) * limit;
    const where = {};
    if (login !== '') {
      where.login = login;
    }
    if (type !== '') {
      where.type = type;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'id', 'DESC' ]);
    }
    const result = await this.ctx.model.Developer.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async reposSwitch({ id, status }) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Repos.unscoped().update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
        },
      });
    return { affected: res };
  }

  async reposEdit({ id, status }) {
    const repos = await this.ctx.model.Repos.unscoped().findOne({
      where: {
        id,
      },
    });
    repos.status = status;
    const res = await repos.save();
    return { affected: res };
  }

  async developerSwitch({ id, status }) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Developer.unscoped().update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
        },
      });
    return { affected: res };
  }

  async developerEdit({ id, status }) {
    const developer = await this.ctx.model.Developer.unscoped().findOne({
      where: {
        id,
      },
    });
    developer.status = status;
    const res = await developer.save();
    return { affected: res };
  }

  async ecosystems({ limit, page, slug, status, sort_type }) {
    const offset = (page - 1) * limit;
    const where = {};
    if (slug !== '') {
      where.slug = slug;
    }
    if (status !== '') {
      where.status = status;
    }
    const order = [];
    if (sort_type !== '') {
      order.push([ sort_type, 'DESC' ]);
    } else {
      order.push([ 'sort', 'ASC' ]);
    }
    const result = await this.ctx.model.Topic.unscoped().findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    return result;
  }

  async ecosystemSwitch({ id, status }) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Topic.unscoped().update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
        },
      });
    return { affected: res };
  }

  async ecosystemEdit(data) {
    const topic = await this.ctx.model.Topic.unscoped().findOne({
      where: {
        id: data.id,
      },
    });

    // Link Sync
    if (data.wiki && data.wiki !== '') {
      this.ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: data.wiki } });
    }
    if (data.homepage && data.homepage !== '') {
      this.ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: data.homepage } });
    }
    if (data.github && data.github !== '') {
      this.ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: data.github } });
    }

    const res = await topic.update(data, {
      fields: [ 'title', 'slug', 'description', 'homepage', 'github', 'wiki', 'sort' ],
    });
    return { affected: res };
  }

  async ecosystemCreate(data) {
    const title = data.title || '';
    data.slug = this.ctx.helper.toSlug(title);
    return await this.ctx.model.Topic.create(
      data,
      {
        fields: [ 'title', 'slug', 'description', 'homepage', 'github', 'wiki', 'sort' ],
      });
  }

  async ecosystemCollectionCreate(data) {
    const title = data.title || '';
    data.slug = this.ctx.helper.toSlug(title);
    return await this.ctx.model.Collection.create(
      data,
      {
        fields: [ 'title', 'slug', 'parent_id', 'topic_id', 'sort' ],
      });
  }

  async ecosystemCollectionEdit(data) {
    const collection = await this.ctx.model.Collection.unscoped().findOne({
      where: {
        id: data.id,
      },
    });
    const res = await collection.update(data, {
      fields: [ 'title', 'slug', 'parent_id', 'topic_id', 'sort', 'status' ],
    });
    return { affected: res };
  }

  async ecosystemCollectionDelete(data) {
    const childCollection = await this.ctx.model.Collection.unscoped().findOne({
      attributes: [ 'id' ],
      where: {
        parent_id: data.id,
      },
    });
    if (childCollection) {
      return false;
    }
    const items = await this.ctx.model.CollectionItem.unscoped().findOne({
      attributes: [ 'id' ],
      where: {
        collection_id: data.id,
      },
    });
    if (items) {
      return false;
    }
    return await this.ctx.model.Collection.unscoped().destroy({
      where: {
        id: data.id,
      },
      limit: 1,
    });
  }

  async ecosystemCollections({ id }) {
    let collections = await this.ctx.model.Collection.unscoped().findAll({
      where: {
        topic_id: id,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });
    collections = JSON.parse(JSON.stringify(collections));
    collections = arrayToTree(collections);

    return collections;
  }

  async ecosystemCollectionItems({ id }) {
    const items = await this.ctx.model.CollectionItem.unscoped().findAll({
      where: {
        collection_id: id,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });

    return items;
  }

  async ecosystemCollectionItemSwitch(data) {
    const res = await this.ctx.model.CollectionItem.unscoped().update(
      {
        status: data.status,
      },
      {
        where: {
          collection_id: data.collection_id,
        },
      });
    return { affected: res };
  }

  async ecosystemCollectionItemCreate(data) {
    if (data.type === 'repos') {
      const repos = await this.ctx.model.Repos.unscoped().findOne({
        where: {
          id: data.foreign_id,
        },
      });
      if (!repos) {
        return false;
      }
      data.title = `${repos.owner}/${repos.repo}`;
    }
    if (data.type === 'developers') {
      const developer = await this.ctx.model.Developer.unscoped().findOne({
        where: {
          id: data.foreign_id,
        },
      });
      if (!developer) {
        return false;
      }
      data.title = `${developer.login} (${developer.name})`;
    }
    if (data.type === 'sites') {
      const site = await this.ctx.model.Site.unscoped().findOne({
        where: {
          id: data.foreign_id,
        },
      });
      if (!site) {
        return false;
      }
      data.title = site.title;
    }
    if (data.type === 'links') {
      const link = await this.ctx.model.Link.unscoped().findOne({
        where: {
          url: data.url,
        },
      });
      if (!link) {
        const newLink = await this.ctx.model.Link.create({
          title: data.title,
          url: data.url,
        });
        data.foreign_id = newLink.id;
      } else {
        data.title = link.title;
        data.foreign_id = link.id;
      }
    }

    return await this.ctx.model.CollectionItem.create(
      data,
      {
        fields: [ 'collection_id', 'title', 'type', 'foreign_id', 'sort' ],
      });
  }

  async ecosystemCollectionItemEdit(data) {
    const item = await this.ctx.model.CollectionItem.unscoped().findOne({
      where: {
        id: data.id,
      },
    });
    const res = await item.update(data, {
      fields: [ 'title', 'sort', 'status' ],
    });
    return { affected: res };
  }

  async ecosystemCollectionItemDelete(data) {
    return await this.ctx.model.CollectionItem.unscoped().destroy({
      where: {
        id: data.id,
      },
      limit: 1,
    });
  }

  async ecosystemCollectionFetch(data) {
    if (data.text && data.text !== '') {
      const topic_id = data.topic_id;
      // Insert Collections
      const collectionTokens = this.lexerCollectionToken(data.text);
      await this.insertCollections(topic_id, collectionTokens);

      // Insert Items
      const itemTokens = this.lexerItemTokens(data.text);
      await this.insertCollectionItems(topic_id, itemTokens);
    }

    return data;
  }

  lexerCollectionToken(md) {
    const collections = toc(md).json;
    let preLvl = 0;
    let curLvl = 0;
    for (let i = 0; i < collections.length; i++) {
      curLvl = collections[i].lvl;
      if (preLvl !== 0) {
        if (curLvl > preLvl) {
          collections[i].parent = collections[i - 1].slug;
        } else if (curLvl === preLvl) {
          collections[i].parent = collections[i - 1].parent;
        } else {
          for (let j = 1; j <= i - 1; j++) {
            if (curLvl === collections[i - j].lvl) {
              collections[i].parent = collections[i - j].parent;
            }
          }
          if (collections[i].parent === undefined) {
            collections[i].parent = collections[0].slug;
          }
        }
      } else {
        collections[i].parent = '';
      }
      preLvl = curLvl;
    }

    return collections;
  }

  async insertCollections(topic_id, tokens) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].parent !== '') {
        const parentCollection = await this.ctx.model.Collection.unscoped().findOne({
          attributes: [ 'id' ],
          where: {
            topic_id,
            slug: tokens[i].parent,
          },
        });
        if (parentCollection) {
          const found = await this.ctx.model.Collection.unscoped().findOne({
            attributes: [ 'id' ],
            where: {
              topic_id,
              parent_id: parentCollection.id,
              slug: tokens[i].slug,
            },
          });
          if (!found) {
            await this.ctx.model.Collection.create({
              topic_id,
              parent_id: parentCollection.id,
              title: tokens[i].content,
              slug: tokens[i].slug,
              sort: tokens[i].i,
            });
          }
        }
      } else {
        const found = await this.ctx.model.Collection.unscoped().findOne({
          attributes: [ 'id' ],
          where: {
            topic_id,
            parent_id: 0,
            slug: tokens[i].slug,
          },
        });
        if (!found) {
          await this.ctx.model.Collection.create({
            topic_id,
            parent_id: 0,
            title: tokens[i].content,
            slug: tokens[i].slug,
            sort: tokens[i].i,
          });
        }
      }
    }
  }

  lexerItemTokens(md) {
    const tokens = marked.lexer(md);

    let list = [];
    const _tokens = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'heading') {
        _tokens.push(tokens[i]);
      }
      if ([ 'text', 'list_start', 'list_end', 'list_item_start', 'list_item_end' ].includes(tokens[i].type)) {
        list.push(tokens[i]);
        if (tokens[i].type === 'list_end') {
          list.forEach(listItem => {
            _tokens.push(listItem);
          });
          list = [];
        }
      }
    }

    const __tokens = [];
    for (let i = 0; i < _tokens.length; i++) {
      if ([ 'heading', 'text' ].includes(_tokens[i].type)) {
        __tokens.push(_tokens[i]);
      }
    }

    for (let i = 0; i < __tokens.length; i++) {
      if (__tokens[i].type === 'text') {
        let slug = '';
        for (let j = i - 1; j >= 0; j--) {
          if (__tokens[j].type === 'heading') {
            slug = __tokens[j].text;
            break;
          }
        }
        __tokens[i].collection = slug;
      }
    }

    return __tokens;
  }

  async insertCollectionItems(topic_id, tokens) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'text') {
        const found = await this.ctx.model.Collection.unscoped().findOne({
          attributes: [ 'id' ],
          where: {
            topic_id,
            title: tokens[i].collection,
          },
        });

        if (found) {
          const analyzeText = await this.analyzeItemText(tokens[i].text);
          const itemExists = await this.ctx.model.CollectionItem.unscoped().findOne({
            where: {
              collection_id: found.id,
              title: (analyzeText.title || tokens[i].text).substring(0, 255),
              type: analyzeText.type || 'text',
              foreign_id: analyzeText.foreign_id || 0,
            },
          });
          if (!itemExists) {
            await this.ctx.model.CollectionItem.create({
              collection_id: found.id,
              title: (analyzeText.title || tokens[i].text).substring(0, 255),
              type: analyzeText.type || 'text',
              sort: i,
              foreign_id: analyzeText.foreign_id || 0,
            });
          }
        }
      }
    }
  }

  async analyzeItemText(text) {
    const found = text.match(/\[(.*)\]\((.*)\)( \- )?(.*)/i);
    const res = {};
    if (found) {
      res.title = found[1];
      if (this.ctx.helper.isUrl(found[2])) {
        // Repos
        const reposFound = this.ctx.helper.isGithubRepos(found[2]);
        if (reposFound) {
          const owner = reposFound[1];
          const repo = reposFound[2];
          const reposExist = await this.ctx.model.Repos.unscoped().findOne({
            attributes: [ 'id' ],
            where: {
              slug: `${owner}-${repo}`,
            },
          });
          if (reposExist) {
            res.foreign_id = reposExist.id;
            res.type = 'repos';
            res.title = `${owner}/${repo}`;
          } else {
            res.foreign_id = 0;
            res.type = 'repos';
            res.title = text;
            // fetch job
            this.ctx.service.queue.addJob({ queue: 'reposFetch', payload: { url: found[2] } });
          }
        }

        // Developer
        const developerFound = this.ctx.helper.isGithubDeveloper(found[2]);
        if (developerFound) {
          const login = developerFound[1];
          const developerExist = await this.ctx.model.Developer.unscoped().findOne({
            attributes: [ 'id' ],
            where: {
              login,
            },
          });
          if (developerExist) {
            res.foreign_id = developerExist.id;
            res.type = 'developers';
            res.title = developerExist.login;
          } else {
            res.foreign_id = 0;
            res.type = 'developers';
            res.title = text;
            // fetch job
            this.ctx.service.queue.addJob({ queue: 'developerFetch', payload: { url: found[2] } });
          }
        }

        // Site
        const siteFound = this.ctx.helper.isSite(found[2]);
        if (siteFound) {
          const siteExist = await this.ctx.model.Site.unscoped().findOne({
            where: {
              url: found[2],
            },
          });
          if (siteExist) {
            res.foreign_id = siteExist.id;
            res.type = 'sites';
            res.title = siteExist.title !== '' ? siteExist.title : found[1];
          } else {
            res.foreign_id = 0;
            res.type = 'sites';
            res.title = text;
          }
        }

        if (!('type' in res)) {
          const linkExist = await this.ctx.model.Link.unscoped().findOne({
            where: {
              url: found[2],
            },
          });
          if (linkExist) {
            res.foreign_id = linkExist.id;
            res.type = 'links';
            res.title = linkExist.title !== '' ? linkExist.title : found[1];
          } else {
            res.foreign_id = 0;
            res.type = 'links';
            res.title = text;
          }
        }
      }
    } else {
      res.title = text;
      res.type = 'text';
    }
    return res;
  }

  async queueReplay(data) {
    return this.ctx.service.queue.replayJob(data.id);
  }

  async queueDelete(data) {
    return this.ctx.service.queue.finishJob(data.id);
  }

  async fetch(data) {
    return this.ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: data.url } });
  }

  async ecosystemCollectionSwitch(data) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Collection.unscoped().update(
      {
        status: data.status,
      },
      {
        where: {
          id: {
            [Op.in]: data.id,
          },
        },
      });
    return { affected: res };
  }

  async ecosystemCollectionMove(data) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Collection.unscoped().update(
      {
        parent_id: data.parent_id,
      },
      {
        where: {
          id: {
            [Op.in]: data.id,
          },
        },
      });
    return { affected: res };
  }

  async ecosystemSource({ id }) {
    return await this.ctx.model.TopicSource.findAll({
      where: {
        topic_id: id,
      },
      order: [
        [ 'updated_at', 'DESC' ],
      ],
    });
  }

  async ecosystemSourceCreate(data) {
    return await this.ctx.model.TopicSource.create(
      data,
      {
        fields: [ 'source', 'url', 'topic_id' ],
      });
  }

  async ecosystemSourceDelete(data) {
    return await this.ctx.model.TopicSource.destroy({
      where: {
        id: data.id,
      },
      limit: 1,
    });
  }

  async ecosystemAttributes({ id }) {
    return await this.ctx.model.TopicAttribute.findAll({
      where: {
        topic_id: id,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });
  }

  async ecosystemAttributeCreate(data) {
    return await this.ctx.model.TopicAttribute.create(
      data,
      {
        fields: [ 'key', 'value', 'topic_id', 'sort' ],
      });
  }

  async ecosystemAttributeEdit(data) {
    const attribute = await this.ctx.model.TopicAttribute.findOne({
      where: {
        id: data.id,
      },
    });
    const res = await attribute.update(data, {
      fields: [ 'key', 'value', 'topic_id', 'sort' ],
    });
    return { affected: res };
  }

  async ecosystemAttributeDelete(data) {
    return await this.ctx.model.TopicAttribute.destroy({
      where: {
        id: data.id,
      },
      limit: 1,
    });
  }

  async ecosystemCollectionCrawler(data) {
    const { app, ctx } = this;
    app.logger.debug(data);
    const readme = await ctx.helper.remember('awesome-repos:readme', 60 * 60, async function() {
      const res = await app.curl('https://raw.githubusercontent.com/bayandin/awesome-awesomeness/master/README.md', {
        dataType: 'text',
      });
      if (res.status === 200) {
        return res.data;
      }
      throw Error('Download fail readme');
    });
    if (typeof readme === 'string') {
      const found = readme.match(/(?:\[(.*?)\]\((.*?)\))/ig);
      found.forEach(i => {
        const match = i.match(/(?:\[(.*?)\]\((.*?)\))/i);
        if (match) {
          ctx.service.queue.addJob({ queue: 'awesomeListFetch', payload: { title: match[1], url: match[2] } });
        }
      });
    }
    return true;
  }

  async ecosystemCollectionItemsCheck() {
    const Op = this.app.Sequelize.Op;
    const { ctx } = this;
    // repos
    const reposItems = await ctx.model.CollectionItem.unscoped().findAll({
      attributes: [ 'id', 'title', 'foreign_id' ],
      where: {
        type: 'repos',
        foreign_id: 0,
        title: {
          [Op.ne]: '',
        },
      },
    });
    for (let i = 0; i < reposItems.length; i++) {
      const found = reposItems[i].title.match(/(?:\[(.*?)\]\((.*?)\))/i);
      if (found) {
        const reposFound = ctx.helper.isGithubRepos(found[2]);
        if (reposFound) {
          const repos = await ctx.model.Repos.unscoped().findOne({
            attributes: [ 'id', 'title' ],
            where: {
              slug: `${reposFound[1]}-${reposFound[2]}`,
            },
          });
          if (repos) {
            reposItems[i].foreign_id = repos.id;
            reposItems[i].title = repos.title;
            await reposItems[i].save();
          } else {
            await ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: found[2] } });
          }
        }
      }
    }
    // developers
    const developersItems = await ctx.model.CollectionItem.unscoped().findAll({
      attributes: [ 'id', 'title', 'foreign_id' ],
      where: {
        type: 'developers',
        foreign_id: 0,
        title: {
          [Op.ne]: '',
        },
      },
    });
    for (let i = 0; i < developersItems.length; i++) {
      const found = developersItems[i].title.match(/(?:\[(.*?)\]\((.*?)\))/i);
      if (found) {
        const developerFound = ctx.helper.isGithubDeveloper(found[2]);
        if (developerFound) {
          const developer = await ctx.model.Developer.unscoped().findOne({
            attributes: [ 'id', 'login', 'name' ],
            where: {
              login: `${developerFound[1]}`,
            },
          });
          if (developer) {
            developersItems[i].foreign_id = developer.id;
            developersItems[i].title = `${developer.login} (${developer.name})`;
            await developersItems[i].save();
          } else {
            await ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: found[2] } });
          }
        }
      }
    }
    // sites
    const sitesItems = await ctx.model.CollectionItem.unscoped().findAll({
      attributes: [ 'id', 'title', 'foreign_id' ],
      where: {
        type: 'sites',
        foreign_id: 0,
        title: {
          [Op.ne]: '',
        },
      },
    });
    for (let i = 0; i < sitesItems.length; i++) {
      const found = sitesItems[i].title.match(/(?:\[(.*?)\]\((.*?)\))/i);
      if (found) {
        const siteFound = ctx.helper.isSite(found[2]);
        if (siteFound) {
          const site = await ctx.model.Site.unscoped().findOne({
            attributes: [ 'id', 'title' ],
            where: {
              url: found[2],
            },
          });
          if (site) {
            sitesItems[i].foreign_id = site.id;
            sitesItems[i].title = typeof site.title === 'string' && site.title.length > 0 ? site.title : found[1];
            await sitesItems[i].save();
          } else {
            await ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: found[2] } });
          }
        }
      }
    }
    // links
    const linksItems = await ctx.model.CollectionItem.unscoped().findAll({
      attributes: [ 'id', 'title', 'foreign_id' ],
      where: {
        type: 'links',
        foreign_id: 0,
        title: {
          [Op.ne]: '',
        },
      },
    });
    for (let i = 0; i < linksItems.length; i++) {
      const found = linksItems[i].title.match(/(?:\[(.*?)\]\((.*?)\))/i);
      if (found) {
        const linkFound = ctx.helper.isUrl(found[2]);
        if (linkFound) {
          const link = await ctx.model.Link.unscoped().findOne({
            attributes: [ 'id', 'title' ],
            where: {
              url: found[2],
            },
          });
          if (link) {
            linksItems[i].foreign_id = link.id;
            linksItems[i].title = typeof link.title === 'string' && link.title.length > 0 ? link.title : found[1];
            await linksItems[i].save();
          } else {
            await ctx.service.queue.addJob({ queue: 'linkFetch', payload: { url: found[2] } });
          }
        }
      }
    }

    return { reposItems, developersItems, sitesItems, linksItems };
  }

  async userAnalytics() {
    const count = await this.ctx.model.User.count();
    return { count };
  }

  async ecosystemAnalytics() {
    const count = await this.ctx.model.Topic.count();
    return { count };
  }

}

module.exports = AdminService;
