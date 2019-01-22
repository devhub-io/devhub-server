'use strict';

const Service = require('egg').Service;
const arrayToTree = require('array-to-tree');

class EcosystemService extends Service {

  async topics({ limit = 5, page = 1 }) {
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
    const rows = [];
    for (let i = 0; i < result.rows.length; i++) {
      rows.push({
        id: result.rows[i].id,
        title: result.rows[i].title,
        slug: result.rows[i].slug,
        description: result.rows[i].description,
        homepage: result.rows[i].homepage,
        github: result.rows[i].github,
        wiki: result.rows[i].wiki,
        collections: collectionIndex[result.rows[i].id],
      });
    }
    result.rows = rows;
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

    const items = await ctx.model.CollectionItem.findAll({
      where: {
        collection_id: collection.id,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });

    return { topic, collection, items, outline };
  }

}

module.exports = EcosystemService;
