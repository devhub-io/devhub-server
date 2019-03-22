'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  const check = app.middleware.check();

  // Home
  router.get('/', controller.home.index);
  router.get('/link', controller.home.link);

  // Repos
  router.get('/repos/home', controller.repos.home);
  router.get('/repos/search', controller.repos.search);
  router.get('/repos/hottest', controller.repos.hottest);
  router.get('/repos/newest', controller.repos.newest);
  router.get('/repos/trend', controller.repos.trend);
  router.get('/repos/recommend', controller.repos.recommend);
  router.get('/repos/category/:slug', controller.repos.category);
  router.post('/repos/:slug/review', controller.repos.review);
  router.get('/repos/:slug', check, controller.repos.find);
  router.get('/count', controller.repos.count);
  router.get('/news', controller.repos.news);
  router.get('/topics', controller.repos.topics);
  router.get('/topic/:topic', controller.repos.topicInPaginate);

  // Feedback
  router.post('/feedback', controller.home.feedback);

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
  router.get('/ecosystem/:topic_slug/collection/:collection_slug/items', controller.ecosystem.items);

  // Check
  const jwt = app.passport.authenticate('jwt', { session: false, successReturnToOrRedirect: null });
  router.get('/auth', jwt, controller.home.index);

  // Workflow
  router.get('/workflow', controller.workflow.workflow);
  router.get('/workflow/:id', controller.workflow.workflowFind);
  router.post('/workflow/create', jwt, controller.workflow.workflowCreate);
  router.post('/workflow/edit', jwt, controller.workflow.workflowEdit);
  router.post('/workflow/delete', jwt, controller.workflow.workflowDelete);
  router.post('/workflow/node/create', jwt, controller.workflow.workflowNodeCreate);
  router.post('/workflow/node/edit', jwt, controller.workflow.workflowNodeEdit);
  router.post('/workflow/node/delete', jwt, controller.workflow.workflowNodeDelete);
  router.post('/workflow/node/item/create', jwt, controller.workflow.workflowNodeItemCreate);
  router.post('/workflow/node/item/edit', jwt, controller.workflow.workflowNodeItemEdit);
  router.post('/workflow/node/item/delete', jwt, controller.workflow.workflowNodeItemDelete);

  // User
  router.post('/star', jwt, controller.user.star);
  router.get('/stars', jwt, controller.user.stars);
  router.get('/user', jwt, controller.user.info);

  // Oauth
  router.get('/passport/github', controller.oauth.github);
  router.get('/passport/github/callback', controller.oauth.callback);

  // Admin
  const admin = app.middleware.admin();
  router.get('/admin', jwt, admin, controller.home.index);
  router.get('/admin/users', jwt, admin, controller.admin.users);
  router.get('/admin/queue_jobs', jwt, admin, controller.admin.queueJobs);
  router.get('/admin/sites', jwt, admin, controller.admin.sites);
  router.get('/admin/links', jwt, admin, controller.admin.links);
  router.get('/admin/wiki', jwt, admin, controller.admin.wiki);
  router.get('/admin/news', jwt, admin, controller.admin.news);
  router.get('/admin/articles', jwt, admin, controller.admin.articles);
  router.get('/admin/click', jwt, admin, controller.admin.click);
  router.get('/admin/vote', jwt, admin, controller.admin.vote);
  router.get('/admin/repos', jwt, admin, controller.admin.repos);
  router.post('/admin/repos/switch', jwt, admin, controller.admin.reposSwitch);
  router.post('/admin/repos/edit', jwt, admin, controller.admin.reposEdit);
  router.post('/admin/repos/enable', jwt, admin, controller.admin.reposEnable);
  router.get('/admin/developers', jwt, admin, controller.admin.developers);
  router.post('/admin/developer/switch', jwt, admin, controller.admin.developerSwitch);
  router.post('/admin/developer/edit', jwt, admin, controller.admin.developerEdit);
  router.post('/admin/developer/enable', jwt, admin, controller.admin.developerEnable);
  router.get('/admin/ecosystems', jwt, admin, controller.admin.ecosystems);
  router.post('/admin/ecosystem/switch', jwt, admin, controller.admin.ecosystemSwitch);
  router.post('/admin/ecosystem/edit', jwt, admin, controller.admin.ecosystemEdit);
  router.post('/admin/ecosystem/create', jwt, admin, controller.admin.ecosystemCreate);
  router.get('/admin/ecosystem/source', jwt, admin, controller.admin.ecosystemSource);
  router.post('/admin/ecosystem/source/create', jwt, admin, controller.admin.ecosystemSourceCreate);
  router.post('/admin/ecosystem/source/delete', jwt, admin, controller.admin.ecosystemSourceDelete);
  router.post('/admin/ecosystem/source/fetch', jwt, admin, controller.admin.ecosystemSourceFetch);
  router.get('/admin/ecosystem/attributes', jwt, admin, controller.admin.ecosystemAttributes);
  router.post('/admin/ecosystem/attribute/create', jwt, admin, controller.admin.ecosystemAttributeCreate);
  router.post('/admin/ecosystem/attribute/edit', jwt, admin, controller.admin.ecosystemAttributeEdit);
  router.post('/admin/ecosystem/attribute/delete', jwt, admin, controller.admin.ecosystemAttributeDelete);
  router.post('/admin/ecosystem/collection/switch', jwt, admin, controller.admin.ecosystemCollectionSwitch);
  router.post('/admin/ecosystem/collection/move', jwt, admin, controller.admin.ecosystemCollectionMove);
  router.post('/admin/ecosystem/collection/create', jwt, admin, controller.admin.ecosystemCollectionCreate);
  router.post('/admin/ecosystem/collection/edit', jwt, admin, controller.admin.ecosystemCollectionEdit);
  router.post('/admin/ecosystem/collection/delete', jwt, admin, controller.admin.ecosystemCollectionDelete);
  router.get('/admin/ecosystem/collections', jwt, admin, controller.admin.ecosystemCollections);
  router.get('/admin/ecosystem/collection/items', jwt, admin, controller.admin.ecosystemCollectionItems);
  router.post('/admin/ecosystem/collection/item/check', jwt, admin, controller.admin.ecosystemCollectionItemCheck);
  router.post('/admin/ecosystem/collection/item/switch', jwt, admin, controller.admin.ecosystemCollectionItemSwitch);
  router.post('/admin/ecosystem/collection/item/create', jwt, admin, controller.admin.ecosystemCollectionItemCreate);
  router.post('/admin/ecosystem/collection/item/edit', jwt, admin, controller.admin.ecosystemCollectionItemEdit);
  router.post('/admin/ecosystem/collection/item/delete', jwt, admin, controller.admin.ecosystemCollectionItemDelete);
  router.post('/admin/ecosystem/collection/import', jwt, admin, controller.admin.ecosystemCollectionImport);
  router.post('/admin/ecosystem/collection/crawler', jwt, admin, controller.admin.ecosystemCollectionCrawler);
  router.post('/admin/queue/replay', jwt, admin, controller.admin.queueReplay);
  router.post('/admin/queue/replay/all', jwt, admin, controller.admin.queueReplayAll);
  router.post('/admin/queue/delete', jwt, admin, controller.admin.queueDelete);
  router.get('/admin/queue/bull/counts', jwt, admin, controller.admin.queueBullCounts);
  router.post('/admin/queue/bull/clean', jwt, admin, controller.admin.queueBullClean);
  router.post('/admin/queue/system/clean', jwt, admin, controller.admin.queueSystemClean);
  router.get('/admin/api/search', jwt, admin, controller.admin.apiSearch);
  router.post('/admin/fetch', jwt, admin, controller.admin.fetch);
  router.get('/admin/website/analytics', jwt, admin, controller.admin.websiteAnalytics);
  router.get('/admin/user/analytics', jwt, admin, controller.admin.userAnalytics);
  router.get('/admin/ecosystem/analytics', jwt, admin, controller.admin.ecosystemAnalytics);
  router.get('/admin/feedback', jwt, admin, controller.admin.feedback);
  router.post('/admin/feedback/switch', jwt, admin, controller.admin.feedbackSwitch);
  router.post('/admin/feedback/delete', jwt, admin, controller.admin.feedbackDelete);
  router.get('/admin/config', jwt, admin, controller.admin.config);
  router.post('/admin/config/create', jwt, admin, controller.admin.configCreate);
  router.post('/admin/config/edit', jwt, admin, controller.admin.configEdit);
  router.post('/admin/config/delete', jwt, admin, controller.admin.configDelete);

  // Socket.io
  io.of('/').route('ping', io.controller.default.ping);

};
