'use strict';

const Service = require('egg').Service;
const octokit = require('@octokit/rest')();
const constant = require('../constant');
const moment = require('moment');
const puppeteer = require('puppeteer');
const os = require('os');
const fs = require('fs');

class JobService extends Service {

  async linkFetch({ url }) {
    const { ctx } = this;

    // Github Developer
    const foundDeveloper = url.match(constant.DEVELOPER_URL_REGEX);
    if (foundDeveloper) {
      await this.developerFetch({ url });
      return true;
    }

    // Github Repos
    const foundRepos = url.match(constant.REPOS_URL_REGEX);
    if (foundRepos) {
      await this.reposFetch({ url });
      return true;
    }

    // Wiki
    const foundWiki = url.match(constant.WIKIPEIDA_URL_REGEX);
    if (foundWiki) {
      let summery = await ctx.service.api.wikipeidaSummery(foundWiki[1]);
      summery = typeof summery === 'string' ? summery : '';
      const exists = await ctx.model.Wiki.unscoped().findOne({
        attributes: [ 'id' ],
        where: {
          url,
        },
      });
      if (exists) {
        exists.summary = summery.substring(0, 2048);
        exists.source = 'wikipeida';
        await exists.save();
      } else {
        await ctx.model.Wiki.create({
          title: foundWiki[1],
          slug: ctx.helper.toSlug(foundWiki[1]),
          summery: summery.substring(0, 2048),
          source: 'wikipeida',
          url,
          status: 1,
        });
      }
      return true;
    }

    // Site
    const foundSite = ctx.helper.isSite(url);
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
      await page.goto(url);
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
          url,
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
          url,
          level: 1,
          screenshot: screenshot || '',
        });
      }
      return true;
    }

    // Link
    const foundLink = ctx.helper.isUrl(url);
    if (foundLink) {
      // crawler
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36');
      await page.goto(url);
      const title = await page.title();
      await browser.close();
      const exists = await ctx.model.Link.unscoped().findOne({
        where: {
          url,
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
          url,
          status: 0,
        });
      }
      return true;
    }

    return false;
  }

  async developerFetch({ url }) {
    const { app, ctx } = this;
    const found = url.match(constant.DEVELOPER_URL_REGEX);
    if (found) {
      const id = await ctx.service.user.selectUserId();
      if (typeof id !== 'number') {
        app.logger.info('[system] DeveloperFetch Job #NotUserId');
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

        let developer = await ctx.model.Developer.unscoped().findOne({
          attributes: [ 'id' ],
          where: {
            login: found[1],
          },
        });
        if (developer) {
          // update
          developer = await ctx.service.developer.updateFromGithubAPI(developer.id, data);
        } else {
          // create
          developer = await ctx.service.developer.createFromGithubAPI(data);
        }

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
                const insertRepos = await ctx.service.repos.createFromGithubAPI(id, repos);
                const { data, headers } = await octokit.repos
                  .getReadme({
                    owner: insertRepos.owner,
                    repo: insertRepos.repo,
                  });
                ctx.service.user.updateUserGithubRemaining(id, headers);

                const result = await app.curl(data.download_url);
                const text = result.data;
                if (typeof text === 'string' && text.length > 0) {
                  insertRepos.readme = text.substring(0, 65534);
                  await insertRepos.save();
                }
              }
            }
          });
        }
        return true;
      } catch (e) {
        app.logger.warn(e);

        if ('headers' in e) {
          ctx.service.user.updateUserGithubRemaining(id, e.headers);
        }
        return false;
      }
    }
  }

  async reposFetch({ url }) {
    const { app, ctx } = this;
    const found = url.match(constant.REPOS_URL_REGEX);
    if (found) {
      const id = await ctx.service.user.selectUserId();
      if (typeof id !== 'number') {
        app.logger.info('[system] ReposFetch Job #NotUserId');
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

        let repos = await ctx.model.Repos.unscoped().findOne({
          attributes: [ 'id' ],
          where: {
            slug: `${found[1]}-${found[2]}`,
          },
        });
        if (repos) {
          // update
          repos = await ctx.service.repos.updateFromGithubAPI(repos.id, data);
        } else {
          // create
          repos = await ctx.service.repos.createFromGithubAPI(id, data);
        }

        if (repos) {
          const { data, headers } = await octokit.repos
            .getReadme({
              owner: found[1],
              repo: found[2],
            });
          ctx.service.user.updateUserGithubRemaining(id, headers);

          // Cache readme_url
          await ctx.helper.setCache(`repos:${repos.id}:readme_url`, 7 * 24 * 60 * 60, data.download_url);

          const result = await app.curl(data.download_url);
          const text = result.data;
          if (typeof text === 'string' && text.length > 0) {
            repos.readme = text.substring(0, 65534);
            await repos.save();
          }
        }
        return true;
      } catch (e) {
        app.logger.warn(e);

        if ('headers' in e) {
          ctx.service.user.updateUserGithubRemaining(id, e.headers);
        }
        return false;
      }
    }
  }

  async newsFetch({ id }) {
    const { ctx } = this;
    const res = await ctx.curl(`https://hacker-news.firebaseio.com/v0/item/${id}.json'`, {
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
      const reposNews = await ctx.model.ReposNews.unscoped().findOne({
        where: {
          url: itemData.url,
          item_id: itemData.id,
        },
      });
      if (reposNews) {
        const repos = await ctx.model.Repos.unscoped().findOne({
          where: {
            slug: `${found[1]}-${found[2]}`,
          },
        });
        if (repos) {
          reposNews.repos_id = repos.id;
        }
        reposNews.score = itemData.score;
        await reposNews.save();
      } else {
        const repos = await ctx.model.Repos.unscoped().findOne({
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

  async awesomeListFetch({ title, url }) {
    if (this.linkFetch({ url })) {
      const { app, ctx } = this;
      const found = url.match(constant.REPOS_URL_REGEX);
      if (found) {
        const existsRepos = await ctx.model.Repos.unscoped().findOne({
          attributes: [ 'id', 'readme' ],
          where: {
            slug: `${found[1]}-${found[2]}`,
          },
        });
        if (existsRepos) {
          // readme
          let readme = '';
          if (typeof existsRepos.readme === 'string' && existsRepos.readme.length > 0) {
            readme = existsRepos.readme;
          } else {
            const cacheReadmeUrl = await ctx.helper.getCache(`repos:${existsRepos.id}:readme_url`);
            if (cacheReadmeUrl) {
              const result = await app.curl(cacheReadmeUrl);
              const text = result.status === 200 && result.data;
              if (typeof text === 'string' && text.length > 0) {
                readme = text.substring(0, 65534);
              }
            }
          }
          // topic
          const source = await ctx.model.TopicSource.findOne({
            where: {
              source: 'Awesome List',
              url,
            },
          });
          let topic_id = 0;
          if (source) {
            topic_id = source.topic_id;
          } else {
            const topic = await ctx.model.Topic.create({
              title,
              slug: ctx.helper.toSlug(title),
              sort: 0,
              status: 0,
            });
            await ctx.model.TopicSource.create({
              topic_id: topic.id,
              source: 'Awesome List',
              url,
            });
            topic_id = topic.id;
          }
          // import
          if (topic_id > 0) {
            await ctx.service.admin.ecosystemCollectionFetch({ topic_id, text: readme });
          }

        }
      }
    }
    return false;
  }

  async echo({ text }) {
    return text;
  }

}

module.exports = JobService;
