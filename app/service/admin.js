'use strict';

const Service = require('egg').Service;
const arrayToTree = require('array-to-tree');

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

}

module.exports = AdminService;
