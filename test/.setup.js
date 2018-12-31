'use strict';

const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(() => factories(app));
afterEach(async () => {
  // clear database after each test case
  await Promise.all([
    app.model.Repos.destroy({ truncate: true, force: true }),
    app.model.Developer.destroy({ truncate: true, force: true }),
    app.model.Collection.destroy({ truncate: true, force: true }),
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
  ]);
});
