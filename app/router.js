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
  router.get('/ecosystem/:slug', controller.ecosystem.find);
  router.get('/ecosystem/:slug/outline', controller.ecosystem.collections);
  router.get('/ecosystem/:slug/items', controller.ecosystem.items);

  // Check
  const jwt = app.passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null });
  router.get('/auth', jwt, controller.home.index);

  // Oauth
  router.get('/passport/github', controller.oauth.github);
  router.get('/passport/github/callback', controller.oauth.callback);

  // Admin
  const admin = app.middleware.admin();
  router.get('/admin', jwt, admin, controller.home.index);
  router.get('/admin/sites', jwt, admin, controller.admin.sites);
  router.get('/admin/links', jwt, admin, controller.admin.links);
  router.get('/admin/wiki', jwt, admin, controller.admin.wiki);
  router.get('/admin/news', jwt, admin, controller.admin.news);
  router.get('/admin/articles', jwt, admin, controller.admin.articles);
  router.get('/admin/repos', jwt, admin, controller.admin.repos);
  router.post('/admin/repos/switch', jwt, admin, controller.admin.reposSwitch);
  router.post('/admin/repos/edit', jwt, admin, controller.admin.reposEdit);
  router.get('/admin/developers', jwt, admin, controller.admin.developers);
  router.post('/admin/developer/switch', jwt, admin, controller.admin.developerSwitch);
  router.post('/admin/developer/edit', jwt, admin, controller.admin.developerEdit);
  router.get('/admin/ecosystems', jwt, admin, controller.admin.ecosystems);
  router.post('/admin/ecosystem/switch', jwt, admin, controller.admin.ecosystemSwitch);
  router.post('/admin/ecosystem/edit', jwt, admin, controller.admin.ecosystemEdit);
  router.post('/admin/ecosystem/create', jwt, admin, controller.admin.ecosystemCreate);
  router.post('/admin/ecosystem/collection/create', jwt, admin, controller.admin.ecosystemCollectionCreate);
  router.post('/admin/ecosystem/collection/edit', jwt, admin, controller.admin.ecosystemCollectionEdit);
  router.post('/admin/ecosystem/collection/delete', jwt, admin, controller.admin.ecosystemCollectionDelete);
  router.get('/admin/ecosystem/collections', jwt, admin, controller.admin.ecosystemCollections);
  router.get('/admin/ecosystem/collection/items', jwt, admin, controller.admin.ecosystemCollectionItems);
  router.post('/admin/ecosystem/collection/item/create', jwt, admin, controller.admin.ecosystemCollectionItemCreate);
  router.post('/admin/ecosystem/collection/item/edit', jwt, admin, controller.admin.ecosystemCollectionItemEdit);
  router.post('/admin/ecosystem/collection/item/delete', jwt, admin, controller.admin.ecosystemCollectionItemDelete);
  router.post('/admin/ecosystem/collection/fetch', jwt, admin, controller.admin.ecosystemCollectionFetch);

};
