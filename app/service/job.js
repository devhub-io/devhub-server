'use strict';

const Service = require('egg').Service;
const octokit = require('@octokit/rest')();
const constant = require('../constant');
const moment = require('moment');
const puppeteer = require('puppeteer');
const os = require('os');
const fs = require('fs');

class JobService extends Service {

  async linkFetch(data) {
    const { ctx } = this;

    // Github Developer
    const foundDeveloper = data.url.match(constant.DEVELOPER_URL_REGEX);
    if (foundDeveloper) {
      await this.developerFetch(data);
      return true;
    }

    // Github Repos
    const foundRepos = data.url.match(constant.REPOS_URL_REGEX);
    if (foundRepos) {
      await this.reposFetch(data);
      return true;
    }

    // Wiki
    const foundWiki = data.url.match(constant.WIKIPEIDA_URL_REGEX);
    if (foundWiki) {
      const summery = await ctx.service.api.wikipeidaSummery(foundWiki[1]);
      const exists = await ctx.model.Wiki.unscoped().findOne({
        attributes: [ 'id' ],
        where: {
          url: data.url,
        },
      });
      if (exists) {
        exists.summary = summery;
        exists.source = 'wikipeida';
        await exists.save();
      } else {
        await ctx.model.Wiki.create({
          title: foundWiki[1],
          slug: ctx.helper.toSlug(foundWiki[1]),
          summery,
          source: 'wikipeida',
          url: data.url,
          status: 1,
        });
      }
      return true;
    }

    // Site
    const foundSite = ctx.helper.isSite(data.url);
    if (foundSite) {
      // crawler
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36');
      await page.setViewport({
        width: 1440,
        height: 900,
      });
      await page.goto(data.url);
      const title = await page.title();
      const filename = ctx.helper.randomString(16);
      const tmpFile = `${os.tmpdir()}/${filename}.png`;
      await page.screenshot({ path: tmpFile });
      await browser.close();
      let screenshot = '';
      if (fs.existsSync(tmpFile)) {
        screenshot = await ctx.service.api.smmsImageUpload(tmpFile);
      }

      const exists = await ctx.model.Site.unscoped().findOne({
        where: {
          url: data.url,
        },
      });
      if (exists) {
        if (screenshot && screenshot !== '') {
          exists.screenshot = screenshot;
          await exists.save();
        }
        if (title && title !== '') {
          exists.title = title;
          await exists.save();
        }
      } else {
        await ctx.model.Site.create({
          title: title || '',
          description: '',
          url: data.url,
          level: 1,
          screenshot: screenshot || '',
        });
      }
      return true;
    }

    // Link
    const foundLink = ctx.helper.isUrl(data.url);
    if (foundLink) {
      // crawler
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36');
      await page.goto(data.url);
      const title = await page.title();
      await browser.close();
      const exists = await ctx.model.Link.unscoped().findOne({
        where: {
          url: data.url,
        },
      });
      if (exists) {
        if (title && title !== '') {
          exists.title = title;
          await exists.save();
        }
      } else {
        await ctx.model.Link.create({
          title: title || '',
          summery: '',
          source: '',
          url: data.url,
          status: 0,
        });
      }
      return true;
    }

    return false;
  }

  async developerFetch(data) {
    const { app, ctx } = this;
    const found = data.url.match(constant.DEVELOPER_URL_REGEX);
    if (found) {
      const exists = await ctx.model.Developer.unscoped().findOne({
        attributes: [ 'id' ],
        where: {
          login: found[1],
        },
      });
      if (exists) {
        app.logger.info('[system] DeveloperFetch Job Developer exists: ' + data.url);
        return false;
      }

      const id = await ctx.service.user.selectUserId();
      if (id === null || id === undefined || id === 0 || id === '') {
        app.logger.info('[system] DeveloperFetch Job not UserId');
        return false;
      }

      const token = await ctx.service.user.userGithubToken({ id });

      octokit.authenticate({
        type: 'oauth',
        token,
      });

      try {
        const { data, headers } = await octokit.users
          .getByUsername({
            username: found[1],
          });

        ctx.service.user.updateUserGithubRemaining(id, headers);

        const developer = await ctx.service.developer.createFromGithubAPI(data);
        if (developer) {
          const { data, headers } = await octokit.repos
            .listForUser({
              username: found[1],
              sort: 'updated',
              per_page: 100,
            });

          ctx.service.user.updateUserGithubRemaining(id, headers);

          data.forEach(async repos => {
            const exists = await ctx.model.Repos.unscoped().findOne({
              attributes: [ 'id' ],
              where: {
                github: repos.html_url,
              },
            });
            if (!exists) {
              if (repos.stargazers_count > 0) {
                const insert_repos = await ctx.service.repos.createFromGithubAPI(id, repos);
                const { data, headers } = await octokit.repos
                  .getReadme({
                    owner: insert_repos.owner,
                    repo: insert_repos.repo,
                  });
                ctx.service.user.updateUserGithubRemaining(id, headers);

                const result = await app.curl(data.download_url);
                const text = result.data;
                if (text !== null && text.length > 0) {
                  insert_repos.readme = text;
                  insert_repos.save();
                }
              }
            }
          });
        }
        return true;
      } catch (e) {
        app.logger.info(e.status);
        app.logger.info(e.message);

        if ('headers' in e) {
          ctx.service.user.updateUserGithubRemaining(id, e.headers);
        }
        return false;
      }
    }
  }

  async reposFetch(data) {
    const { app, ctx } = this;
    const found = data.url.match(constant.REPOS_URL_REGEX);
    if (found) {
      const exists = await ctx.model.Repos.unscoped().findOne({
        attributes: [ 'id' ],
        where: {
          slug: `${found[1]}-${found[2]}`,
        },
      });
      if (exists) {
        app.logger.info('[system] ReposFetch Job Repos exists: ' + data.url);
        return false;
      }

      const id = await ctx.service.user.selectUserId();
      if (id === null || id === undefined || id === 0 || id === '') {
        app.logger.info('[system] ReposFetch Job not UserId');
        return false;
      }

      const token = await ctx.service.user.userGithubToken({ id });

      octokit.authenticate({
        type: 'oauth',
        token,
      });

      try {
        const { data, headers } = await octokit.repos
          .get({
            owner: found[1],
            repo: found[2],
          });
        ctx.service.user.updateUserGithubRemaining(id, headers);

        const repos = await ctx.service.repos.createFromGithubAPI(id, data);
        if (repos) {
          const { data, headers } = await octokit.repos
            .getReadme({
              owner: found[1],
              repo: found[2],
            });
          ctx.service.user.updateUserGithubRemaining(id, headers);

          const result = await app.curl(data.download_url);
          const text = result.data;
          if (text !== null && text.length > 0) {
            repos.readme = text;
            repos.save();
          }
        }
        return true;
      } catch (e) {
        app.logger.info(e.status);
        app.logger.info(e.message);

        if ('headers' in e) {
          ctx.service.user.updateUserGithubRemaining(id, e.headers);
        }
        return false;
      }
    }
  }

  async newsFetch(data) {
    const { ctx } = this;
    const res = await ctx.curl(`https://hacker-news.firebaseio.com/v0/item/${data.item_id}.json'`, {
      dataType: 'json',
    });
    const itemData = res.data;
    let found;
    if (typeof itemData.url === 'string') {
      found = itemData.url.match(constant.REPOS_URL_REGEX);
    } else {
      found = null;
    }
    if (found) {
      const reposNews = await ctx.model.ReposNews.findOne({
        where: {
          url: itemData.url,
          item_id: itemData.id,
        },
      });
      if (reposNews) {
        const repos = await ctx.model.Repos.findOne({
          where: {
            slug: `${found[1]}-${found[2]}`,
          },
        });
        if (repos) {
          reposNews.repos_id = repos.id;
        }
        reposNews.score = itemData.score;
        reposNews.save();
      } else {
        const repos = await ctx.model.Repos.findOne({
          where: {
            slug: `${found[1]}-${found[2]}`,
          },
        });
        let reposId = 0;
        if (repos) {
          reposId = repos.id;
        } else {
          const githubUrl = `https://github.com/${found[1]}/${found[2]}`;
          ctx.service.queue.addJob({ queue: 'reposFetch', payload: { url: githubUrl } });
        }
        await ctx.model.ReposNews.create({
          url: itemData.url,
          time: itemData.time,
          repos_id: reposId,
          title: itemData.title.replace('Show HN: ', ''),
          score: itemData.score,
          item_id: itemData.id,
          post_date: moment(itemData.time * 1000).format('YYYY-MM-DD'),
        });
      }
    }
    return true;
  }

  async echo(data) {
    return data.text;
  }

}

module.exports = JobService;
