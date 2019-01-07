'use strict';

const { factory } = require('factory-girl');
const faker = require('faker');
const moment = require('moment');

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

  // collection_repos
  factory.define('collection_repos', app.model.CollectionRepos, {
    collection_id: factory.sequence('CollectionRepos.collection_id', n => n),
    repos_id: factory.sequence('CollectionRepos.repos_id', n => n),
    sort: 1,
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

  // topic_explain
  factory.define('topic_explain', app.model.TopicExplain, {
    topic: 'a',
    explain: 'abc',
    created_at: new Date(),
    updated_at: new Date(),
  });

  // repos_news
  factory.define('repos_news', app.model.ReposNews, {
    url: faker.internet.url(),
    title: faker.random.word(),
    repos_id: 1,
    score: faker.random.number(),
    time: faker.random.number(),
    item_id: faker.random.number(),
    post_date: moment(new Date()).format('YYYY-MM-DD'),
    created_at: new Date(),
    updated_at: new Date(),
  });

  // sites
  factory.define('site', app.model.Site, {
    title: factory.sequence('Site.title', n => `site_${n}`),
    category: factory.sequence('Site.category', n => `category_${n}`),
    url: faker.internet.url(),
    sort: faker.random.number(),
    is_enable: 1,
    icon: 'icon',
    description: 'description',
    level: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  // developer_languages
  factory.define('developer_language', app.model.DeveloperLanguage, {
    developer_id: factory.sequence('DeveloperLanguage.developer_id', n => n),
    language: factory.sequence('DeveloperLanguage.language', n => `lang_${n}`),
    bytes: factory.sequence('DeveloperLanguage.bytes', n => n),
  });

  // repos_contributors
  factory.define('repos_contributor', app.model.ReposContributor, {
    repos_id: factory.sequence('ReposContributor.repos_id', n => n),
    login: 'abc',
    avatar_url: faker.image.avatar(),
    html_url: faker.internet.url(),
    type: 'User',
    site_admin: 1,
    contributions: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  // repos_tags
  factory.define('repos_tag', app.model.ReposTag, {
    repos_id: factory.sequence('ReposTag.repos_id', n => n),
    name: factory.sequence('ReposTag.name', n => `tag_${n}`),
    zipball_url: faker.internet.url(),
    tarball_url: faker.internet.url(),
    commit_sha: '177272',
  });

  // repos_badges
  factory.define('repos_badge', app.model.ReposBadge, {
    repos_id: factory.sequence('ReposBadge.repos_id', n => n),
    name: factory.sequence('ReposBadge.name', n => `badge_${n}`),
    url: faker.internet.url(),
    type: 'a',
  });

  // repos_questions
  factory.define('repos_question', app.model.ReposQuestion, {
    repos_id: factory.sequence('ReposQuestion.repos_id', n => n),
    title: factory.sequence('ReposQuestion.title', n => `q_${n}`),
    link: faker.internet.url(),
    view_count: faker.random.number(),
    answer_count: faker.random.number(),
    score: faker.random.number(),
    question_id: faker.random.number(),
    creation_date: new Date(),
    last_edit_date: new Date(),
    last_activity_date: new Date(),
  });

  // packages
  factory.define('package', app.model.Package, {
    provider: 'a',
    name: factory.sequence('Package.name', n => `package_${n}`),
    repository: 'repository',
    json: 'json',
    package_url: faker.internet.url(),
    repos_id: faker.random.number(),
    fetched_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });

  // repos_dependencies
  factory.define('repos_dependency', app.model.ReposDependency, {
    repos_id: factory.sequence('ReposDependency.repos_id', n => n),
    source: 'source',
    env: 'env',
    package: 'package',
    version: '1.0',
    version_condition: '1.0',
    created_at: new Date(),
    updated_at: new Date(),
  });

  // repos_languages
  factory.define('repos_language', app.model.ReposLanguage, {
    repos_id: factory.sequence('ReposLanguage.repos_id', n => n),
    language: factory.sequence('ReposLanguage.language', n => `lang_${n}`),
    bytes: 1,
  });

  // users
  factory.define('user', app.model.User, {
    email: factory.sequence('User.email', n => `email_${n}@email.local`),
    password: 'abc',
    created_at: new Date(),
    updated_at: new Date(),
    last_activated_at: new Date(),
  });

  // services
  factory.define('service', app.model.Service, {
    name: factory.sequence('Service.name', n => `service_${n}`),
    user_id: 1,
    provider: 'github',
    token: 'abc',
    secret: 'abc',
    refresh_token: 'abc',
    expires_at: new Date('2999-01-01 00:00:00'),
    created_at: new Date(),
    updated_at: new Date(),
  });
};
