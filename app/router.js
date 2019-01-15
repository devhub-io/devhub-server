'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/link', controller.home.link);
  // Repos
  router.get('/repos/home', controller.repos.home);
  router.get('/repos/search', controller.repos.search);
  router.get('/repos/hottest', controller.repos.hottest);
  router.get('/repos/newest', controller.repos.newest);
  router.get('/repos/trend', controller.repos.trend);
  router.get('/repos/recommend', controller.repos.recommend);
  router.get('/repos/collections', controller.repos.collections);
  router.get('/repos/collection/:slug', controller.repos.collection);
  router.get('/repos/category/:slug', controller.repos.category);
  router.post('/repos/:slug/review', controller.repos.review);
  router.get('/repos/:slug', controller.repos.find);
  router.get('/count', controller.repos.count);
  router.get('/news', controller.repos.news);
  router.get('/topics', controller.repos.topics);
  router.get('/topic/:topic', controller.repos.topicInPaginate);
  // Sites
  router.get('/sites', controller.repos.sites);
  // Category
  router.get('/category/top', controller.category.topColumn);
  // Developer
  router.get('/developer/list', controller.developer.list);
  router.get('/developer/:slug', controller.developer.find);

  // Ecosystems
  router.get('/ecosystems', controller.ecosystem.topics);

  // Check
  const jwt = app.passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null });
  router.get('/auth', jwt, controller.home.index);
  const admin = app.middleware.admin();
  router.get('/admin', jwt, admin, controller.home.index);

  // Oauth
  router.get('/passport/github', controller.oauth.github);
  router.get('/passport/github/callback', controller.oauth.callback);
};
