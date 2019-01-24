'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const nock = require('nock');

function mockGithubRepsHttp(slug) {
  nock('https://api.github.com')
    .get(`/repos/sysatom/${slug}`)
    .query(true)
    .reply(200, {
      id: 26386942,
      node_id: 'MDEwOlJlcG9zaXRvcnkyNjM4Njk0Mg==',
      name: slug,
      full_name: `sysatom/${slug}`,
      private: false,
      owner: {
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
      },
      html_url: `https://github.com/sysatom/${slug}`,
      description: 'golang exercise',
      fork: false,
      url: 'https://api.github.com/repos/sysatom/goexercise',
      forks_url: 'https://api.github.com/repos/sysatom/goexercise/forks',
      keys_url: 'https://api.github.com/repos/sysatom/goexercise/keys{/key_id}',
      collaborators_url: 'https://api.github.com/repos/sysatom/goexercise/collaborators{/collaborator}',
      teams_url: 'https://api.github.com/repos/sysatom/goexercise/teams',
      hooks_url: 'https://api.github.com/repos/sysatom/goexercise/hooks',
      issue_events_url: 'https://api.github.com/repos/sysatom/goexercise/issues/events{/number}',
      events_url: 'https://api.github.com/repos/sysatom/goexercise/events',
      assignees_url: 'https://api.github.com/repos/sysatom/goexercise/assignees{/user}',
      branches_url: 'https://api.github.com/repos/sysatom/goexercise/branches{/branch}',
      tags_url: 'https://api.github.com/repos/sysatom/goexercise/tags',
      blobs_url: 'https://api.github.com/repos/sysatom/goexercise/git/blobs{/sha}',
      git_tags_url: 'https://api.github.com/repos/sysatom/goexercise/git/tags{/sha}',
      git_refs_url: 'https://api.github.com/repos/sysatom/goexercise/git/refs{/sha}',
      trees_url: 'https://api.github.com/repos/sysatom/goexercise/git/trees{/sha}',
      statuses_url: 'https://api.github.com/repos/sysatom/goexercise/statuses/{sha}',
      languages_url: 'https://api.github.com/repos/sysatom/goexercise/languages',
      stargazers_url: 'https://api.github.com/repos/sysatom/goexercise/stargazers',
      contributors_url: 'https://api.github.com/repos/sysatom/goexercise/contributors',
      subscribers_url: 'https://api.github.com/repos/sysatom/goexercise/subscribers',
      subscription_url: 'https://api.github.com/repos/sysatom/goexercise/subscription',
      commits_url: 'https://api.github.com/repos/sysatom/goexercise/commits{/sha}',
      git_commits_url: 'https://api.github.com/repos/sysatom/goexercise/git/commits{/sha}',
      comments_url: 'https://api.github.com/repos/sysatom/goexercise/comments{/number}',
      issue_comment_url: 'https://api.github.com/repos/sysatom/goexercise/issues/comments{/number}',
      contents_url: 'https://api.github.com/repos/sysatom/goexercise/contents/{+path}',
      compare_url: 'https://api.github.com/repos/sysatom/goexercise/compare/{base}...{head}',
      merges_url: 'https://api.github.com/repos/sysatom/goexercise/merges',
      archive_url: 'https://api.github.com/repos/sysatom/goexercise/{archive_format}{/ref}',
      downloads_url: 'https://api.github.com/repos/sysatom/goexercise/downloads',
      issues_url: 'https://api.github.com/repos/sysatom/goexercise/issues{/number}',
      pulls_url: 'https://api.github.com/repos/sysatom/goexercise/pulls{/number}',
      milestones_url: 'https://api.github.com/repos/sysatom/goexercise/milestones{/number}',
      notifications_url: 'https://api.github.com/repos/sysatom/goexercise/notifications{?since,all,participating}',
      labels_url: 'https://api.github.com/repos/sysatom/goexercise/labels{/name}',
      releases_url: 'https://api.github.com/repos/sysatom/goexercise/releases{/id}',
      deployments_url: 'https://api.github.com/repos/sysatom/goexercise/deployments',
      created_at: '2014-11-09T05:59:26Z',
      updated_at: '2014-11-09T06:12:24Z',
      pushed_at: '2014-11-15T09:13:31Z',
      git_url: 'git://github.com/sysatom/goexercise.git',
      ssh_url: 'git@github.com:sysatom/goexercise.git',
      clone_url: 'https://github.com/sysatom/goexercise.git',
      svn_url: 'https://github.com/sysatom/goexercise',
      homepage: null,
      size: 160,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'Go',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      open_issues_count: 0,
      license: {
        key: 'mit',
        name: 'MIT License',
        spdx_id: 'MIT',
        url: 'https://api.github.com/licenses/mit',
        node_id: 'MDc6TGljZW5zZTEz',
      },
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      network_count: 0,
      subscribers_count: 1,
    }, {
      'X-RateLimit-Limit': 5000,
      'X-RateLimit-Remaining': 4999,
      'X-RateLimit-Reset': 1548302656,
    });
  const download_url = `https://raw.githubusercontent.com/sysatom/${slug}/master/README.md`;
  nock('https://api.github.com')
    .get(`/repos/sysatom/${slug}/readme`)
    .query(true)
    .reply(200, {
      name: 'README.md',
      path: 'README.md',
      sha: '1917dc43713cffc6867316402f515a0b582f1a72',
      size: 39,
      url: 'https://api.github.com/repos/sysatom/goexercise/contents/README.md?ref=master',
      html_url: 'https://github.com/sysatom/goexercise/blob/master/README.md',
      git_url: 'https://api.github.com/repos/sysatom/goexercise/git/blobs/1917dc43713cffc6867316402f515a0b582f1a72',
      download_url,
      type: 'file',
      content: 'Z29leGVyY2lzZQo9PT09PT09PT09Cgpnb2xhbmcgZXhlcmNpc2UK\n',
      encoding: 'base64',
      _links: {
        self: 'https://api.github.com/repos/sysatom/goexercise/contents/README.md?ref=master',
        git: 'https://api.github.com/repos/sysatom/goexercise/git/blobs/1917dc43713cffc6867316402f515a0b582f1a72',
        html: 'https://github.com/sysatom/goexercise/blob/master/README.md',
      },
    }, {
      'X-RateLimit-Limit': 5000,
      'X-RateLimit-Remaining': 4998,
      'X-RateLimit-Reset': 1548302656,
    });
  app.mockHttpclient(download_url, {
    data: 'demo',
    status: 404,
  });
}

function mockGithubDeveloperHttp() {
  nock('https://api.github.com')
    .get('/users/sysatom')
    .query(true)
    .reply(200, {
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
    }, {
      'X-RateLimit-Limit': 5000,
      'X-RateLimit-Remaining': 4999,
      'X-RateLimit-Reset': 1548302656,
    });
  nock('https://api.github.com')
    .get('/users/sysatom/repos')
    .query(true)
    .reply(200, [
      {
        id: 26386942,
        node_id: 'MDEwOlJlcG9zaXRvcnkyNjM4Njk0Mg==',
        name: 'goexercise',
        full_name: 'sysatom/goexercise',
        private: false,
        owner: {
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
        },
        html_url: 'https://github.com/sysatom/goexercise',
        description: 'golang exercise',
        fork: false,
        url: 'https://api.github.com/repos/sysatom/goexercise',
        forks_url: 'https://api.github.com/repos/sysatom/goexercise/forks',
        keys_url: 'https://api.github.com/repos/sysatom/goexercise/keys{/key_id}',
        collaborators_url: 'https://api.github.com/repos/sysatom/goexercise/collaborators{/collaborator}',
        teams_url: 'https://api.github.com/repos/sysatom/goexercise/teams',
        hooks_url: 'https://api.github.com/repos/sysatom/goexercise/hooks',
        issue_events_url: 'https://api.github.com/repos/sysatom/goexercise/issues/events{/number}',
        events_url: 'https://api.github.com/repos/sysatom/goexercise/events',
        assignees_url: 'https://api.github.com/repos/sysatom/goexercise/assignees{/user}',
        branches_url: 'https://api.github.com/repos/sysatom/goexercise/branches{/branch}',
        tags_url: 'https://api.github.com/repos/sysatom/goexercise/tags',
        blobs_url: 'https://api.github.com/repos/sysatom/goexercise/git/blobs{/sha}',
        git_tags_url: 'https://api.github.com/repos/sysatom/goexercise/git/tags{/sha}',
        git_refs_url: 'https://api.github.com/repos/sysatom/goexercise/git/refs{/sha}',
        trees_url: 'https://api.github.com/repos/sysatom/goexercise/git/trees{/sha}',
        statuses_url: 'https://api.github.com/repos/sysatom/goexercise/statuses/{sha}',
        languages_url: 'https://api.github.com/repos/sysatom/goexercise/languages',
        stargazers_url: 'https://api.github.com/repos/sysatom/goexercise/stargazers',
        contributors_url: 'https://api.github.com/repos/sysatom/goexercise/contributors',
        subscribers_url: 'https://api.github.com/repos/sysatom/goexercise/subscribers',
        subscription_url: 'https://api.github.com/repos/sysatom/goexercise/subscription',
        commits_url: 'https://api.github.com/repos/sysatom/goexercise/commits{/sha}',
        git_commits_url: 'https://api.github.com/repos/sysatom/goexercise/git/commits{/sha}',
        comments_url: 'https://api.github.com/repos/sysatom/goexercise/comments{/number}',
        issue_comment_url: 'https://api.github.com/repos/sysatom/goexercise/issues/comments{/number}',
        contents_url: 'https://api.github.com/repos/sysatom/goexercise/contents/{+path}',
        compare_url: 'https://api.github.com/repos/sysatom/goexercise/compare/{base}...{head}',
        merges_url: 'https://api.github.com/repos/sysatom/goexercise/merges',
        archive_url: 'https://api.github.com/repos/sysatom/goexercise/{archive_format}{/ref}',
        downloads_url: 'https://api.github.com/repos/sysatom/goexercise/downloads',
        issues_url: 'https://api.github.com/repos/sysatom/goexercise/issues{/number}',
        pulls_url: 'https://api.github.com/repos/sysatom/goexercise/pulls{/number}',
        milestones_url: 'https://api.github.com/repos/sysatom/goexercise/milestones{/number}',
        notifications_url: 'https://api.github.com/repos/sysatom/goexercise/notifications{?since,all,participating}',
        labels_url: 'https://api.github.com/repos/sysatom/goexercise/labels{/name}',
        releases_url: 'https://api.github.com/repos/sysatom/goexercise/releases{/id}',
        deployments_url: 'https://api.github.com/repos/sysatom/goexercise/deployments',
        created_at: '2014-11-09T05:59:26Z',
        updated_at: '2014-11-09T06:12:24Z',
        pushed_at: '2014-11-15T09:13:31Z',
        git_url: 'git://github.com/sysatom/goexercise.git',
        ssh_url: 'git@github.com:sysatom/goexercise.git',
        clone_url: 'https://github.com/sysatom/goexercise.git',
        svn_url: 'https://github.com/sysatom/goexercise',
        homepage: null,
        size: 160,
        stargazers_count: 3,
        watchers_count: 0,
        language: 'Go',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        open_issues_count: 0,
        license: {
          key: 'mit',
          name: 'MIT License',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit',
          node_id: 'MDc6TGljZW5zZTEz',
        },
        forks: 0,
        open_issues: 0,
        watchers: 0,
        default_branch: 'master',
      },
      {
        id: 39110673,
        node_id: 'MDEwOlJlcG9zaXRvcnkzOTExMDY3Mw==',
        name: 'rails',
        full_name: 'sysatom/rails',
        private: false,
        owner: {
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
        },
        html_url: 'https://github.com/sysatom/rails',
        description: 'Ruby on Rails',
        fork: true,
        url: 'https://api.github.com/repos/sysatom/rails',
        forks_url: 'https://api.github.com/repos/sysatom/rails/forks',
        keys_url: 'https://api.github.com/repos/sysatom/rails/keys{/key_id}',
        collaborators_url: 'https://api.github.com/repos/sysatom/rails/collaborators{/collaborator}',
        teams_url: 'https://api.github.com/repos/sysatom/rails/teams',
        hooks_url: 'https://api.github.com/repos/sysatom/rails/hooks',
        issue_events_url: 'https://api.github.com/repos/sysatom/rails/issues/events{/number}',
        events_url: 'https://api.github.com/repos/sysatom/rails/events',
        assignees_url: 'https://api.github.com/repos/sysatom/rails/assignees{/user}',
        branches_url: 'https://api.github.com/repos/sysatom/rails/branches{/branch}',
        tags_url: 'https://api.github.com/repos/sysatom/rails/tags',
        blobs_url: 'https://api.github.com/repos/sysatom/rails/git/blobs{/sha}',
        git_tags_url: 'https://api.github.com/repos/sysatom/rails/git/tags{/sha}',
        git_refs_url: 'https://api.github.com/repos/sysatom/rails/git/refs{/sha}',
        trees_url: 'https://api.github.com/repos/sysatom/rails/git/trees{/sha}',
        statuses_url: 'https://api.github.com/repos/sysatom/rails/statuses/{sha}',
        languages_url: 'https://api.github.com/repos/sysatom/rails/languages',
        stargazers_url: 'https://api.github.com/repos/sysatom/rails/stargazers',
        contributors_url: 'https://api.github.com/repos/sysatom/rails/contributors',
        subscribers_url: 'https://api.github.com/repos/sysatom/rails/subscribers',
        subscription_url: 'https://api.github.com/repos/sysatom/rails/subscription',
        commits_url: 'https://api.github.com/repos/sysatom/rails/commits{/sha}',
        git_commits_url: 'https://api.github.com/repos/sysatom/rails/git/commits{/sha}',
        comments_url: 'https://api.github.com/repos/sysatom/rails/comments{/number}',
        issue_comment_url: 'https://api.github.com/repos/sysatom/rails/issues/comments{/number}',
        contents_url: 'https://api.github.com/repos/sysatom/rails/contents/{+path}',
        compare_url: 'https://api.github.com/repos/sysatom/rails/compare/{base}...{head}',
        merges_url: 'https://api.github.com/repos/sysatom/rails/merges',
        archive_url: 'https://api.github.com/repos/sysatom/rails/{archive_format}{/ref}',
        downloads_url: 'https://api.github.com/repos/sysatom/rails/downloads',
        issues_url: 'https://api.github.com/repos/sysatom/rails/issues{/number}',
        pulls_url: 'https://api.github.com/repos/sysatom/rails/pulls{/number}',
        milestones_url: 'https://api.github.com/repos/sysatom/rails/milestones{/number}',
        notifications_url: 'https://api.github.com/repos/sysatom/rails/notifications{?since,all,participating}',
        labels_url: 'https://api.github.com/repos/sysatom/rails/labels{/name}',
        releases_url: 'https://api.github.com/repos/sysatom/rails/releases{/id}',
        deployments_url: 'https://api.github.com/repos/sysatom/rails/deployments',
        created_at: '2015-07-15T01:59:34Z',
        updated_at: '2015-07-15T02:00:01Z',
        pushed_at: '2015-07-14T23:31:52Z',
        git_url: 'git://github.com/sysatom/rails.git',
        ssh_url: 'git@github.com:sysatom/rails.git',
        clone_url: 'https://github.com/sysatom/rails.git',
        svn_url: 'https://github.com/sysatom/rails',
        homepage: 'http://rubyonrails.org',
        size: 144693,
        stargazers_count: 2,
        watchers_count: 0,
        language: 'Ruby',
        has_issues: false,
        has_projects: true,
        has_downloads: true,
        has_wiki: false,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        open_issues_count: 0,
        license: null,
        forks: 0,
        open_issues: 0,
        watchers: 0,
        default_branch: 'master',
      },
    ], {
      'X-RateLimit-Limit': 5000,
      'X-RateLimit-Remaining': 4998,
      'X-RateLimit-Reset': 1548302656,
    });
}

describe('test/app/service/job.test.js', () => {

  describe('No User', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const falseReposStatus = await ctx.service.job.reposFetch({ url: 'https://github.com/sysatom/goexercise' });
      assert(falseReposStatus === false);
      const falseDeveloperStatus = await ctx.service.job.developerFetch({ url: 'https://github.com/sysatom' });
      assert(falseDeveloperStatus === false);
    });
  });

  describe('Repos Fetch', () => {
    it('should work', async () => {
      const token = '123456';
      const user = await app.factory.create('repos', {
        email: 'demo@email.local',
        password: 'abc',
        created_at: new Date(),
        updated_at: new Date(),
        last_activated_at: new Date(),
      });
      await app.factory.create('service', {
        user_id: user.id,
        provider: 'github',
        token,
        secret: '',
        refresh_token: '',
        expires_at: new Date('2999-01-01 00:00:00'),
        created_at: new Date(),
        updated_at: new Date(),
      });
      mockGithubRepsHttp('goexercise');

      const ctx = app.mockContext({});
      const status = await ctx.service.job.reposFetch({ url: 'https://github.com/sysatom/goexercise' });
      assert(status === true);
      const falseStatus = await ctx.service.job.reposFetch({ url: 'https://github.com/sysatom/goexercise' });
      assert(falseStatus === false);
      nock.cleanAll();
    });
  });

  describe('Developer Fetch', () => {
    it('should work', async () => {
      const token = '4796692f0e48d6584ef15764cda9581f599eceed';
      const user = await app.factory.create('repos', {
        email: 'demo@email.local',
        password: 'abc',
        created_at: new Date(),
        updated_at: new Date(),
        last_activated_at: new Date(),
      });
      await app.factory.create('service', {
        user_id: user.id,
        provider: 'github',
        token,
        secret: '',
        refresh_token: '',
        expires_at: new Date('2999-01-01 00:00:00'),
        created_at: new Date(),
        updated_at: new Date(),
      });
      mockGithubDeveloperHttp();
      mockGithubRepsHttp('goexercise');
      mockGithubRepsHttp('rails');

      const ctx = app.mockContext({});
      const status = await ctx.service.job.developerFetch({ url: 'https://github.com/sysatom' });
      assert(status === true);
      const falseStatus = await ctx.service.job.developerFetch({ url: 'https://github.com/sysatom' });
      assert(falseStatus === false);
      nock.cleanAll();
    });
  });

  describe('News Fetch', () => {
    it('should work', async () => {
      await app.factory.create('repos', {
        title: 'repos_2',
        category_id: 0,
        slug: 'sysatom-demo',
        readme: 'readme',
        description: 'desc',
        language: 'js',
        homepage: '1',
        github: 'https://github.com/sysatom/demo',
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
        owner: 'sysatom',
        repo: 'demo',
        cover: 'demo',
        document_url: '',
      });
      const base = 'https://hacker-news.firebaseio.com';
      app.mockHttpclient(`${base}/v0/item/1.json'`, {
        data: {
          by: 'test', descendants: 15, id: 1,
          kids: [ 15, 234509, 487171, 454410, 82729 ], score: 5712,
          time: (new Date()).getTime() / 1000,
          title: 'Y1 Combinator', type: 'story', url: 'https://github.com/sysatom/demo',
        },
      });
      app.mockHttpclient(`${base}/v0/item/2.json'`, {
        data: {
          by: 'test', descendants: 15, id: 2,
          kids: [ 15, 234509, 487171, 454410, 82729 ], score: 56113,
          time: (new Date()).getTime() / 1000,
          title: 'Y2 Combinator', type: 'story', url: 'https://github.com/sysatom/test',
        },
      });
      const ctx = app.mockContext({});
      await ctx.service.job.newsFetch({ item_id: 1 });
      await ctx.service.job.newsFetch({ item_id: 2 });
      const resNews = await app.httpRequest().get('/news');
      assert(resNews.status === 200);
      assert(resNews.body.count === 2);
      assert(resNews.body.rows.length === 2);
    });
  });

});
