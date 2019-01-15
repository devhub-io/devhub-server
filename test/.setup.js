'use strict';

const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(() => factories(app));
afterEach(async () => {
  // clear database after each test case
  await Promise.all([
    app.model.Repos.destroy({ truncate: true, force: true }),
    app.model.Developer.destroy({ truncate: true, force: true }),
    app.model.CollectionRepos.destroy({ truncate: true, force: true }),
    app.model.Category.destroy({ truncate: true, force: true }),
    app.model.ReposTopic.destroy({ truncate: true, force: true }),
    app.model.TopicExplain.destroy({ truncate: true, force: true }),
    app.model.ReposNews.destroy({ truncate: true, force: true }),
    app.model.Site.destroy({ truncate: true, force: true }),
    app.model.DeveloperLanguage.destroy({ truncate: true, force: true }),
    app.model.ReposContributor.destroy({ truncate: true, force: true }),
    app.model.ReposTag.destroy({ truncate: true, force: true }),
    app.model.ReposBadge.destroy({ truncate: true, force: true }),
    app.model.ReposQuestion.destroy({ truncate: true, force: true }),
    app.model.Package.destroy({ truncate: true, force: true }),
    app.model.ReposDependency.destroy({ truncate: true, force: true }),
    app.model.ReposLanguage.destroy({ truncate: true, force: true }),
    app.model.User.destroy({ truncate: true, force: true }),
    app.model.Service.destroy({ truncate: true, force: true }),
    app.model.ReposVote.destroy({ truncate: true, force: true }),
    app.model.LinkClick.destroy({ truncate: true, force: true }),
    app.model.Topic.destroy({ truncate: true, force: true }),
    app.model.Collection.destroy({ truncate: true, force: true }),
    app.model.CollectionItem.destroy({ truncate: true, force: true }),
    app.model.Wiki.destroy({ truncate: true, force: true }),
  ]);
  // clear redis after each test case
  await app.redis.flushdb();
  // clear elasticsearch index after each test case
  // try {
  //   await app.elasticsearch.indices.delete({ index: app.config.elasticsearch.index });
  // } catch (e) {
  //   app.logger.info(e.message);
  // }
});
