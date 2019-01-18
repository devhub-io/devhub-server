'use strict';

const Service = require('egg').Service;
const arrayToTree = require('array-to-tree');
const toc = require('markdown-toc');
const marked = require('marked');

class AdminService extends Service {

  async sites({ limit = 5, page = 1, title = '', status = '', sort_type = '' }) {
    const Op = this.app.Sequelize.Op;
    const offset = (page - 1) * limit;
    const where = {};
    if (title !== '') {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (status !== '') {
      where.is_enable = status;
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

  async repos({ limit = 5, page = 1, slug = '', status = '', sort_type = '' }) {
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

  async reposSwitch({ id, status }) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Repos.update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
          status: status === 1 ? 0 : 1,
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
    const res = repos.save();
    return { affected: res };
  }

  async developers({ limit = 5, page = 1, login = '', status = '', sort_type = '', type = '' }) {
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

  async developerSwitch({ id, status }) {
    const Op = this.app.Sequelize.Op;
    const res = await this.ctx.model.Developer.update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
          status: status === 1 ? 0 : 1,
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
    const res = developer.save();
    return { affected: res };
  }

  async ecosystems({ limit = 5, page = 1, slug = '', status = '', sort_type = '' }) {
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
    const res = await this.ctx.model.Topic.update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: id,
          },
          status: status === 1 ? 0 : 1,
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
    const res = await topic.update(data, {
      fields: [ 'title', 'slug', 'description', 'homepage', 'github', 'wiki', 'sort' ],
    });
    return { affected: res };
  }

  async ecosystemCreate(data) {
    const title = data.title || '';
    data.slug = title.replace(' ', '-').toLowerCase();
    return await this.ctx.model.Topic.create(
      data,
      {
        fields: [ 'title', 'slug', 'description', 'homepage', 'github', 'wiki', 'sort' ],
      });
  }

  async ecosystemCollectionCreate(data) {
    const title = data.title || '';
    data.slug = title.replace(' ', '-').toLowerCase();
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
      // Cache TODO
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
            // TODO
            res.foreign_id = 0;
            res.type = 'repos';
            res.title = text;
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

}

module.exports = AdminService;
