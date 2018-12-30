'use strict';

const { factory } = require('factory-girl');
const faker = require('faker');

module.exports = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // repos
  factory.define('repos', app.model.Repos, {
    title: factory.sequence('Repos.title', n => `repos_${n}`),
    category_id: 0,
    slug: factory.sequence('Repos.slug', n => `${n}_${faker.random.uuid()}`),
    readme: 'readme',
    description: 'description',
    language: 'javascript',
    homepage: faker.internet.url(),
    github: 'https://github.io',
    stargazers_count: faker.random.number(),
    watchers_count: faker.random.number(),
    open_issues_count: faker.random.number(),
    forks_count: faker.random.number(),
    subscribers_count: faker.random.number(),
    issue_response: faker.random.number(),
    status: 1,
    repos_created_at: new Date(),
    repos_updated_at: new Date(),
    fetched_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    analytics_at: new Date(),
    user_id: 0,
    is_recommend: 1,
    trends: '0,15,50,63,0,35,0,53',
    owner: 'a',
    repo: 'b',
    cover: faker.image.imageUrl(),
    document_url: faker.internet.url(),
  });

  // developer
  factory.define('developer', app.model.Developer, {
    login: factory.sequence('Developer.login', n => `developer_${n}`),
    name: faker.name.firstName(),
    description: 'description',
    github_id: faker.random.number(),
    avatar_url: faker.image.avatar(),
    html_url: faker.internet.url(),
    type: 'Organization',
    site_admin: 1,
    company: faker.company.companyName(),
    blog: faker.internet.url(),
    location: faker.address.city(),
    email: faker.internet.email(),
    public_repos: faker.random.number(),
    public_gists: faker.random.number(),
    followers: faker.random.number(),
    following: faker.random.number(),
    view_number: 0,
    status: 1,
    site_created_at: new Date(),
    site_updated_at: new Date(),
    fetched_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    analytics_at: new Date(),
    rating: 0,
  });

  // collections
  factory.define('collection', app.model.Collection, {
    title: factory.sequence('Collection.title', n => `collection_${n}`),
    image: faker.image.imageUrl(),
    slug: factory.sequence('Collection.slug', n => `${n}_${faker.random.uuid()}`),
    sort: faker.random.number(),
    is_enable: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  // categories
  factory.define('category', app.model.Category, {
    title: factory.sequence('Category.title', n => `category_${n}`),
    slug: factory.sequence('Category.slug', n => `${n}_${faker.random.uuid()}`),
    parent_id: 0,
    created_at: new Date(),
    updated_at: new Date(),
  });

  // repos_topics
  factory.define('repos_topic', app.model.ReposTopic, {
    repos_id: factory.sequence('ReposTopic.repos_id', n => n),
    topic: 'a',
  });
};
