'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const moment = require('moment');

describe('test/app/controller/repos.test.js', () => {
  describe('GET /repos/hottest', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建 repos 对象到数据库中
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].owner);
      assert(res.body.rows[0].repo);
    });
  });

  describe('GET /repos/newest', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].owner);
      assert(res.body.rows[0].repo);
    });
  });

  describe('GET /repos/trend', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].owner);
      assert(res.body.rows[0].repo);
    });
  });

  describe('GET /repos/recommend', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 3);
      const res = await app.httpRequest().get('/repos/hottest?limit=2');
      assert(res.status === 200);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].cover);
    });
  });

  describe('GET /count', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 3);
      await app.factory.createMany('developer', 2);
      const res = await app.httpRequest().get('/count');
      assert(res.status === 200);
      assert(res.body.repos === 3);
      assert(res.body.developers === 2);
    });
  });

  describe('GET /repos/collections', () => {
    it('should work', async () => {
      await app.factory.createMany('collection', 3);
      const res = await app.httpRequest().get('/repos/collections?limit=2');
      assert(res.status === 200);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].image);
    });
  });

  describe('GET /topics', () => {
    it('should work', async () => {
      await app.factory.createMany('repos_topic', 3);
      const res = await app.httpRequest().get('/topics');
      assert(res.status === 200);
      assert(res.body.length === 1);
      assert(res.body[0].number);
      assert(res.body[0].topic);
    });
  });

  describe('GET /topics/:topic', () => {
    it('should work', async () => {
      const repos = await app.factory.createMany('repos', 3);
      const id = [];
      repos.forEach(i => {
        id.push(i.id);
        return true;
      });
      for (let i = 0; i < id.length; i++) {
        await app.factory.create('repos_topic', { repos_id: id[i], topic: 'a' });
      }
      await app.factory.createMany('topic_explain', 1);
      const res = await app.httpRequest().get('/topic/a?limit=2&page=2');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].slug);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].topic.name);
      assert(res.body.explain.text);
    });
  });

  describe('GET /news', () => {
    it('should work', async () => {
      const repos = await app.factory.createMany('repos', 3);
      const id = [];
      repos.forEach(i => {
        id.push(i.id);
        return true;
      });
      for (let i = 0; i < id.length; i++) {
        await app.factory.create('repos_news',
          {
            url: 'http://demo.local',
            title: `title_${i}`,
            repos_id: id[i],
            score: (i + 1) * 10,
            time: (i + 1) * 10,
            item_id: (i + 1) * 10,
            post_date: moment().subtract(i, 'd').format('YYYY-MM-DD'),
            created_at: new Date(),
            updated_at: new Date(),
          });
      }
      const res = await app.httpRequest().get('/news');
      assert(res.status === 200);
      assert(res.body.count === 1);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].url);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].score);
      assert(res.body.rows[0].item_id);
      assert(res.body.rows[0].post_date === moment().format('YYYY-MM-DD'));
      assert(res.body.rows[0].repos.title);
      assert(res.body.rows[0].repos.slug);
      assert(res.body.rows[0].repos.cover);
      assert(res.body.rows[0].repos.description);
      assert(res.body.rows[0].repos.stargazers_count);
      assert(res.body.rows[0].repos.owner);
      assert(res.body.rows[0].repos.repo);
      assert(res.body.next === null);
      assert(res.body.prev.post_date === moment().subtract(1, 'd').format('YYYY-MM-DD'));
    });
  });

  describe('GET /sites', () => {
    it('should work', async () => {
      await app.factory.createMany('site', 3);
      const res = await app.httpRequest().get('/sites');
      assert(res.status === 200);
      assert(Object.keys(res.body).length === 3);
      const firstKey = Object.keys(res.body)[0];
      assert(res.body[firstKey][0].title);
      assert(res.body[firstKey][0].url);
      assert(res.body[firstKey][0].category);
      assert(res.body[firstKey][0].icon);
      assert(res.body[firstKey][0].description);
    });
  });


  describe('GET /repos/:slug', () => {
    it('should work', async () => {
      const repos = await app.factory.create('repos');
      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos_tag',
          {
            repos_id: repos.id,
            name: `tag_${i}`,
            zipball_url: 'url',
            tarball_url: 'url',
            commit_sha: '10101',
          });
      }
      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos_contributor',
          {
            repos_id: repos.id,
            login: 'abc',
            avatar_url: 'url',
            html_url: 'url',
            type: 'User',
            site_admin: 1,
            contributions: 1,
            created_at: new Date(),
            updated_at: new Date(),
          });
      }
      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos_language',
          {
            repos_id: repos.id,
            language: `lang_${i}`,
            bytes: 1,
          });
      }
      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos_badge',
          {
            repos_id: repos.id,
            name: `badge_${i}`,
            url: 'url',
            type: 'a',
          });
      }
      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos_question',
          {
            repos_id: repos.id,
            title: `q_${i}`,
            link: 'url',
            view_count: 1,
            answer_count: 1,
            score: 1,
            question_id: 1,
            creation_date: new Date(),
            last_edit_date: new Date(),
            last_activity_date: new Date(),
          });
      }
      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos_news',
          {
            repos_id: repos.id,
            url: 'url',
            title: 'title',
            score: 1,
            time: 1,
            item_id: 1,
            post_date: moment(new Date()).format('YYYY-MM-DD'),
            created_at: new Date(),
            updated_at: new Date(),
          });
      }
      for (let i = 0; i < 2; i++) {
        await app.factory.create('package',
          {
            repos_id: repos.id,
            provider: 'a',
            name: `package_${i}`,
            repository: 'repository',
            json: 'json',
            package_url: 'url',
            fetched_at: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
          });
      }
      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos_topic',
          {
            repos_id: repos.id,
            topic: `topic_${i}`,
          });
      }

      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos_dependency',
          {
            repos_id: repos.id,
            source: 'source',
            env: 'env',
            package: 'package',
            version: '1.0',
            version_condition: '1.0',
            created_at: new Date(),
            updated_at: new Date(),
          });
      }

      const res = await app.httpRequest().get(`/repos/${repos.slug}`);
      assert(res.status === 200);
      assert(Object.keys(res.body).length === 10);
      assert(res.body.repos.slug === repos.slug);
      assert(res.body.repos.title);
      assert(res.body.repos.description);

      assert(res.body.tags.length === 2);
      assert(res.body.tags[0].name);
      assert(res.body.tags[0].zipball_url);

      assert(res.body.contributors.length === 2);
      assert(res.body.contributors[0].login);
      assert(res.body.contributors[0].avatar_url);

      assert(res.body.languages.length === 2);
      assert(res.body.languages[0].language);
      assert(res.body.languages[0].bytes);

      assert(res.body.badges.length === 2);
      assert(res.body.badges[0].name);
      assert(res.body.badges[0].url);

      assert(res.body.questions.length === 2);
      assert(res.body.questions[0].title);
      assert(res.body.questions[0].link);

      assert(res.body.news.length === 2);
      assert(res.body.news[0].title);
      assert(res.body.news[0].url);

      assert(res.body.packages.length === 2);
      assert(res.body.packages[0].name);
      assert(res.body.packages[0].repository);

      assert(res.body.topics.length === 2);
      assert(res.body.topics[0].topic);

      assert(res.body.dependencies.length === 2);
      assert(res.body.dependencies[0].version);
      assert(res.body.dependencies[0].package);

      const res404 = await app.httpRequest().get('/repos/notfound');
      assert(res404.status === 404);
    });
  });

});
