'use strict';

const { assert, app } = require('egg-mock/bootstrap');
const mm = require('egg-mock');
const moment = require('moment');

describe('test/app/controller/repos.test.js', () => {

  describe('GET /repos/home', () => {
    it('should work', async () => {
      await app.factory.createMany('repos', 1);
      const res = await app.httpRequest().get('/repos/home');
      assert(res.status === 200);
      assert(Object.keys(res.body).length === 4);
      assert(res.body.hottest);
      assert(res.body.newest);
      assert(res.body.trend);
      assert(res.body.recommend);
    });
  });

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
      const res = await app.httpRequest().get('/repos/newest?limit=2&page=2');
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
      const res = await app.httpRequest().get('/repos/trend?limit=2&page=2');
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
      const res = await app.httpRequest().get('/repos/recommend?limit=2');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].id);
      assert(res.body[0].title);
      assert(res.body[0].slug);
      assert(res.body[0].cover);
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

  describe('GET /repos/category/:slug', () => {
    it('should work', async () => {
      const category = await app.factory.create('category');
      const twoCategory = await app.factory.create('category', {
        title: 'two',
        slug: 'two',
        parent_id: category.id,
      });
      const repos = await app.factory.create('repos', {
        title: 'repos_2',
        category_id: twoCategory.id,
        slug: 'two-repos',
        readme: 'readme',
        description: 'desc',
        language: 'js',
        homepage: '1',
        github: 'https://github.io',
        stargazers_count: 1,
        watchers_count: 1,
        open_issues_count: 1,
        forks_count: 1,
        subscribers_count: 1,
        issue_response: 1,
        status: 1,
        repos_created_at: new Date(),
        repos_updated_at: new Date(),
        fetched_at: new Date(),
        analytics_at: new Date(),
        user_id: 0,
        is_recommend: 1,
        trends: '0,15,50,63,0,35,0,53',
        owner: 'a',
        repo: 'b',
        cover: 'demo',
        document_url: '',
      });
      const res = await app.httpRequest().get(`/repos/category/${category.slug}`);
      assert(res.status === 200);
      assert(res.body.count === 1);
      assert(res.body.page === 1);
      assert(res.body.last_page === 1);
      assert(res.body.rows[0].slug === repos.slug);
      assert(res.body.rows[0].title);
      assert(res.body.rows[0].cover);
      assert(res.body.rows[0].trends);
      assert(res.body.rows[0].stargazers_count);
      assert(res.body.rows[0].description);
      assert(res.body.rows[0].owner);
      assert(res.body.rows[0].repo);
      assert(res.body.category.length === 1);
      assert(res.body.category[0].slug === twoCategory.slug);

      const res2 = await app.httpRequest().get(`/repos/category/${twoCategory.slug}`);
      assert(res2.status === 200);
      assert(res2.body.count === 1);
      assert(res2.body.page === 1);
      assert(res2.body.last_page === 1);
      assert(res2.body.rows[0].slug === repos.slug);
      assert(res2.body.category.length === 1);
      assert(res2.body.category[0].slug === twoCategory.slug);
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
      // TODO
      // assert(res.body.rows[0].repos.title);
      // assert(res.body.rows[0].repos.slug);
      // assert(res.body.rows[0].repos.cover);
      // assert(res.body.rows[0].repos.description);
      // assert(res.body.rows[0].repos.stargazers_count);
      // assert(res.body.rows[0].repos.owner);
      // assert(res.body.rows[0].repos.repo);
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
            source: 'npm',
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
      assert(Object.keys(res.body).length === 12);
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

      assert(res.body.dependencies.npm);
      assert(res.body.dependencies.npm.env);
      assert(res.body.dependencies.npm.env[0].package);

      const res404 = await app.httpRequest().get('/repos/notfound');
      assert(res404.status === 404);
    });
  });

  describe('POST /repos/:slug/review', () => {
    it('should work', async () => {
      const repos = await app.factory.create('repos');
      await app.httpRequest()
        .post(`/repos/${repos.slug}/review`)
        .type('form')
        .send({
          reliable: 1,
          recommendation: 0,
          documentation: -1,
        })
        .expect(200)
        .expect({
          status: true,
        });
      await app.httpRequest()
        .post(`/repos/${repos.slug}/review`)
        .type('form')
        .send({
          reliable: 1,
          recommendation: 0,
          documentation: -1,
        })
        .expect(200)
        .expect({
          status: false,
        });
      await app.httpRequest()
        .post('/repos/not-repos-review-slug/review')
        .type('form')
        .send({
          reliable: 1,
          recommendation: 0,
          documentation: -1,
        })
        .expect(200)
        .expect({
          status: false,
        });
    });
  });

  describe('GET /repos/search', () => {
    it('should work', async () => {
      const app = mm.app();
      await app.ready();
      await app.factory.createMany('repos', 3);
      const status = await app.runSchedule('index_sync');
      assert(status);

      const keyword = 'description';
      const res = await app.httpRequest().get(`/repos/search?keyword=${keyword}&limit=2&page=2`);
      assert(res.status === 200);
      assert(Object.keys(res.body).length === 4);
      // assert(res.body.count === 3);
      // assert(res.body.rows[0].description === 'description');
      // assert(res.body.rows[0].title);
      // assert(res.body.rows[0].slug);
      // assert(res.body.rows[0].cover);
    });
  });

});
