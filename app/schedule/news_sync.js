'use strict';

const Subscription = require('egg').Subscription;
const moment = require('moment');
const constant = require('../constant');

class NewsSync extends Subscription {

  static get schedule() {
    return {
      interval: '1h',
      type: 'worker',
    };
  }

  async subscribe() {
    const ctx = this.ctx;
    const base = 'https://hacker-news.firebaseio.com';
    const endpoints = {
      top: '/v0/topstories.json',
      new: '/v0/newstories.json',
    };

    let newsCount = 0;

    for (const endpointsKey in endpoints) {
      let items;
      try {
        const res = await ctx.curl(base + endpoints[endpointsKey], {
          dataType: 'json',
          timeout: 60000,
        });
        items = res.data;
      } catch (e) {
        items = [];
      }
      for (let i = 0; i < items.length; i++) {
        try {
          const res = await ctx.curl(`${base}/v0/item/${items[i]}.json'`, {
            dataType: 'json',
            timeout: 60000,
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
              newsCount = newsCount + 1;
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
                ctx.app.queue.add({ job: 'reposFetch', data: { url: githubUrl } });
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
              newsCount = newsCount + 1;
            }
          }
        } catch (e) {
          this.app.logger.error(e);
        }
      }
    }

    return newsCount;
  }
}

module.exports = NewsSync;
