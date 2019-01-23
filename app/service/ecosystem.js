'use strict';

const Service = require('egg').Service;
const arrayToTree = require('array-to-tree');

class EcosystemService extends Service {

  async topics({ limit, page }) {
    const Op = this.app.Sequelize.Op;
    page = page >= 1000 ? 1000 : page;
    const offset = (page - 1) * limit;
    const result = await this.ctx.model.Topic.findAndCountAll({
      attributes: [ 'id', 'title', 'slug', 'description', 'homepage', 'github', 'wiki' ],
      limit,
      offset,
      order: [
        [ 'sort', 'ASC' ],
      ],
    });
    result.last_page = Math.ceil(result.count / limit);
    result.page = page;
    // collections
    const topicId = [];
    for (let i = 0; i < result.rows.length; i++) {
      topicId.push(result.rows[i].id);
    }
    const collections = await this.ctx.model.Collection.findAll({
      attributes: [ 'topic_id', 'title', 'slug', 'sort' ],
      where: {
        topic_id: {
          [Op.in]: topicId,
        },
        parent_id: 0,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });
    const collectionIndex = {};
    for (let i = 0; i < collections.length; i++) {
      if (collections[i].topic_id in collectionIndex) {
        collectionIndex[collections[i].topic_id].push(collections[i]);
      } else {
        collectionIndex[collections[i].topic_id] = [ collections[i] ];
      }
    }
    result.rows = JSON.parse(JSON.stringify(result.rows));
    for (let i = 0; i < result.rows.length; i++) {
      result.rows[i].collections = collectionIndex[result.rows[i].id];
    }

    return result;
  }

  async findBySlug(slug) {
    const ctx = this.ctx;
    const topic = await ctx.model.Topic.findOne({
      where: {
        slug,
      },
    });
    if (!topic) {
      this.ctx.throw(404, 'Ecosystem not found');
    }

    // PV
    const clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    const k = await this.app.redis.get(`devhub:topic:${topic.id}:pv:${clientIP}`);
    if (!k) {
      await this.app.redis.set(`devhub:topic:${topic.id}:pv:${clientIP}`, 1);
      await this.app.redis.expire(`devhub:topic:${topic.id}:pv:${clientIP}`, 24 * 60 * 60);
      topic.view_number = topic.view_number + 1;
      await topic.save();
    }

    const wiki = await ctx.model.Wiki.findOne({
      where: {
        url: topic.wiki,
      },
    });

    let collections = await ctx.model.Collection.findAll({
      attributes: [ 'id', 'parent_id', 'title', 'slug' ],
      where: {
        topic_id: topic.id,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });
    collections = JSON.parse(JSON.stringify(collections));
    collections = arrayToTree(collections);

    return { topic, wiki, collections };
  }

  async collections(slug) {
    const ctx = this.ctx;
    const topic = await ctx.model.Topic.findOne({
      where: {
        slug,
      },
    });
    if (!topic) {
      this.ctx.throw(404, 'Ecosystem not found');
    }

    let collections = await ctx.model.Collection.findAll({
      attributes: [ 'id', 'parent_id', 'title', 'slug' ],
      where: {
        topic_id: topic.id,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });
    collections = JSON.parse(JSON.stringify(collections));
    collections = arrayToTree(collections);

    return collections;
  }

  async items(topic_slug, collection_slug) {
    const Op = this.app.Sequelize.Op;
    const ctx = this.ctx;
    const topic = await ctx.model.Topic.findOne({
      attributes: [ 'id', 'title', 'slug' ],
      where: {
        slug: topic_slug,
      },
    });
    if (!topic) {
      this.ctx.throw(404, 'Ecosystem not found');
    }
    const collection = await ctx.model.Collection.findOne({
      attributes: [ 'id', 'title', 'slug', 'view_number' ],
      where: {
        topic_id: topic.id,
        slug: collection_slug,
      },
    });
    if (!collection) {
      this.ctx.throw(404, 'Collection not found');
    }

    // outline
    const outline = await this.collections(topic_slug);

    // PV
    const clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    const k = await this.app.redis.get(`devhub:topic:${topic.id}:collection:${collection.id}:pv:${clientIP}`);
    if (!k) {
      await this.app.redis.set(`devhub:topic:${topic.id}:collection:${collection.id}:pv:${clientIP}`, 1);
      await this.app.redis.expire(`devhub:topic:${topic.id}:collection:${collection.id}:pv:${clientIP}`, 24 * 60 * 60);
      collection.view_number = collection.view_number + 1;
      await collection.save();
    }

    // items
    let items = await ctx.model.CollectionItem.findAll({
      where: {
        collection_id: collection.id,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });
    const typeItemsId = {
      repos: [],
      developers: [],
      sites: [],
      links: [],
    };
    for (let i = 0; i < items.length; i++) {
      if (items[i].type === 'repos') {
        typeItemsId.repos.push(items[i].foreign_id);
      }
      if (items[i].type === 'developers') {
        typeItemsId.developers.push(items[i].foreign_id);
      }
      if (items[i].type === 'sites') {
        typeItemsId.sites.push(items[i].foreign_id);
      }
      if (items[i].type === 'links') {
        typeItemsId.links.push(items[i].foreign_id);
      }
    }
    items = JSON.parse(JSON.stringify(items));
    const typeItemsIndex = {
      repos: {},
      developers: {},
      sites: {},
      links: {},
    };
    if (typeItemsId.repos.length > 0) {
      const repos = await this.ctx.model.Repos.findAll({
        attributes: [ 'id', 'title', 'slug', 'cover', 'description', 'stargazers_count', 'owner', 'repo' ],
        where: {
          id: {
            [Op.in]: typeItemsId.repos,
          },
        },
      });
      for (let i = 0; i < repos.length; i++) {
        typeItemsIndex.repos[repos[i].id] = repos[i];
      }
    }
    if (typeItemsId.developers.length > 0) {
      const developers = await this.ctx.model.Developer.findAll({
        attributes: [ 'id', 'login', 'name', 'avatar_url', 'type' ],
        where: {
          id: {
            [Op.in]: typeItemsId.developers,
          },
        },
      });
      for (let i = 0; i < developers.length; i++) {
        typeItemsIndex.developers[developers[i].id] = developers[i];
      }
    }
    if (typeItemsId.sites.length > 0) {
      const sites = await this.ctx.model.Site.findAll({
        attributes: [ 'id', 'title', 'url', 'description', 'screenshot' ],
        where: {
          id: {
            [Op.in]: typeItemsId.sites,
          },
        },
      });
      for (let i = 0; i < sites.length; i++) {
        typeItemsIndex.sites[sites[i].id] = sites[i];
      }
    }
    if (typeItemsId.links.length > 0) {
      const links = await this.ctx.model.Link.findAll({
        attributes: [ 'id', 'title', 'summary', 'source', 'url' ],
        where: {
          id: {
            [Op.in]: typeItemsId.links,
          },
        },
      });
      for (let i = 0; i < links.length; i++) {
        typeItemsIndex.links[links[i].id] = links[i];
      }
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].type === 'repos') {
        items[i].foreign = typeItemsIndex.repos[items[i].foreign_id];
      }
      if (items[i].type === 'developers') {
        items[i].foreign = typeItemsIndex.developers[items[i].foreign_id];
      }
      if (items[i].type === 'sites') {
        items[i].foreign = typeItemsIndex.sites[items[i].foreign_id];
      }
      if (items[i].type === 'links') {
        items[i].foreign = typeItemsIndex.links[items[i].foreign_id];
      }
    }

    return { topic, collection, items, outline };
  }

}

module.exports = EcosystemService;
