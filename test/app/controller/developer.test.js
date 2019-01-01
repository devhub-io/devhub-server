'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/developer.test.js', () => {

  describe('GET /developer/list', () => {
    it('should work', async () => {
      await app.factory.createMany('developer', 3);
      const res = await app.httpRequest().get('/developer/list?limit=2&page=2&type=Organization');
      assert(res.status === 200);
      assert(res.body.page === 2);
      assert(res.body.count === 3);
      assert(res.body.last_page === 2);
      assert(res.body.rows.length === 1);
      assert(res.body.rows[0].id);
      assert(res.body.rows[0].login);
      assert(res.body.rows[0].avatar_url);
      assert(res.body.rows[0].type);
    });
  });

  describe('GET /developer/:slug', () => {
    it('should work', async () => {
      const developer = await app.factory.create('developer');
      for (let i = 0; i < 2; i++) {
        await app.factory.create('repos',
          {
            title: `repos_${i}`,
            category_id: 0,
            slug: `${developer.login}-repos_${i}`,
            readme: 'readme',
            description: 'description',
            language: 'javascript',
            homepage: 'http://hi.demo',
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
            created_at: new Date(),
            updated_at: new Date(),
            analytics_at: new Date(),
            user_id: 0,
            is_recommend: 1,
            trends: '0,15,50,63,0,35,0,53',
            owner: developer.login,
            repo: `repos_${i}`,
            cover: 'http://jpg.jpg',
            document_url: 'http://doc.doc',
          });
      }
      for (let i = 0; i < 2; i++) {
        await app.factory.create('developer_language',
          {
            developer_id: developer.id,
            language: `lang_${i}`,
            bytes: `${i + 10}`,
          });
      }

      const repos = await app.factory.createMany('repos', 2);
      const id = [];
      repos.forEach(i => {
        id.push(i.id);
        return true;
      });
      for (let i = 0; i < id.length; i++) {
        await app.factory.create('repos_contributor',
          {
            repos_id: id[i],
            login: developer.login,
            avatar_url: 'http://avatar.jpg',
            html_url: 'http://demo.url',
            type: 'User',
            site_admin: 1,
            contributions: 1,
            created_at: new Date(),
            updated_at: new Date(),
          });
      }

      const res = await app.httpRequest().get(`/developer/${developer.login}`);
      assert(res.status === 200);
      assert(Object.keys(res.body).length === 4);
      assert(res.body.developer.login === developer.login);
      assert(res.body.developer.name);
      assert(res.body.developer.avatar_url);
      assert(res.body.owner_repos.length === 2);
      assert(res.body.owner_repos[0].slug);
      assert(res.body.owner_repos[0].title);
      assert(res.body.owner_repos[0].cover);
      assert(res.body.owner_repos[0].description);
      assert(res.body.owner_repos[0].stargazers_count);
      assert(res.body.owner_repos[0].trends);
      assert(res.body.developer_languages.length === 2);
      assert(res.body.developer_languages[0].language);
      assert(res.body.developer_languages[0].bytes);
      assert(res.body.contribute_repos.length === 2);
      assert(res.body.contribute_repos[0].repos_id);
      assert(res.body.contribute_repos[0].repos.slug);
      assert(res.body.contribute_repos[0].repos.title);
      assert(res.body.contribute_repos[0].repos.cover);
      assert(res.body.contribute_repos[0].repos.description);
      assert(res.body.contribute_repos[0].repos.stargazers_count);
      assert(res.body.contribute_repos[0].repos.trends);
    });
  });

});
