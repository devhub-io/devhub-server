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
  ]);
});
