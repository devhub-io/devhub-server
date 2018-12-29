'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // 定义 repos 和默认数据
  factory.define('repos', app.model.Repos, {
    title: factory.sequence('Repos.title', n => `title_${n}`),
    readme: 'readme',
  });
};
