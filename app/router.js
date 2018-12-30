'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // Repos
  router.get('/repos/hottest', controller.repos.hottest);
  router.get('/repos/newest', controller.repos.newest);
  router.get('/repos/trend', controller.repos.trend);
  router.get('/repos/recommend', controller.repos.recommend);
  router.get('/repos/collections', controller.repos.collections);
  router.get('/count', controller.repos.count);
  router.get('/topics', controller.repos.topics);
  // Category
  router.get('/category/top', controller.category.topColumn);
  // Developer
  router.get('/developer/list', controller.developer.list);
};
