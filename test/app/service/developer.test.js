'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/developer.test.js', () => {

  describe('createFromGithubAPI', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const data = {
        login: 'sysatom',
        id: 1270641,
        node_id: 'MDQ6VXNlcjEyNzA2NDE=',
        avatar_url: 'https://avatars3.githubusercontent.com/u/1270641?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/sysatom',
        html_url: 'https://github.com/sysatom',
        followers_url: 'https://api.github.com/users/sysatom/followers',
        following_url: 'https://api.github.com/users/sysatom/following{/other_user}',
        gists_url: 'https://api.github.com/users/sysatom/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/sysatom/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/sysatom/subscriptions',
        organizations_url: 'https://api.github.com/users/sysatom/orgs',
        repos_url: 'https://api.github.com/users/sysatom/repos',
        events_url: 'https://api.github.com/users/sysatom/events{/privacy}',
        received_events_url: 'https://api.github.com/users/sysatom/received_events',
        type: 'User',
        site_admin: false,
        name: 'Robin',
        company: null,
        blog: 'https://devhub.io',
        location: null,
        email: null,
        hireable: null,
        bio: null,
        public_repos: 17,
        public_gists: 8,
        followers: 14,
        following: 16,
        created_at: '2011-12-18T07:42:10Z',
        updated_at: '2019-01-12T03:32:35Z',
      };
      const res = await ctx.service.developer.createFromGithubAPI(data);
      assert(res.login === data.login);
      const res2 = await ctx.service.developer.createFromGithubAPI(data);
      assert(res2 === false);
    });
  });
});
