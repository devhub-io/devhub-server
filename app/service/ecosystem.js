'use strict';

const Service = require('egg').Service;
const arrayToTree = require('array-to-tree');

class EcosystemService extends Service {

  async topics({ limit = 5, page = 1 }) {
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
      topic.save();
    }

    const wiki = await ctx.model.Wiki.findOne({
      where: {
        url: topic.wiki,
      },
    });

    const collections = await ctx.model.Collection.findAll({
      where: {
        topic_id: topic.id,
        parent_id: 0,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });

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
      where: {
        slug: topic_slug,
      },
    });
    if (!topic) {
      this.ctx.throw(404, 'Ecosystem not found');
    }
    const collection = await ctx.model.Collection.findOne({
      where: {
        topic_id: topic.id,
        slug: collection_slug,
      },
    });
    if (!collection) {
      this.ctx.throw(404, 'Collection not found');
    }

    const items = await ctx.model.CollectionItem.findAll({
      where: {
        collection_id: collection.id,
      },
      order: [
        [ 'sort', 'ASC' ],
      ],
    });

    return items;
  }

}

module.exports = EcosystemService;
