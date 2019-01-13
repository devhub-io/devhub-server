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
    const base = 'https://hacker-news.firebaseio.com';
    const endpoints = {
      top: '/v0/topstories.json',
      new: '/v0/newstories.json',
    };

    for (const endpointsKey in endpoints) {
      let items;
      try {
        const res = await this.ctx.curl(base + endpoints[endpointsKey], {
          dataType: 'json',
          timeout: 60000,
        });
        items = res.data;
      } catch (e) {
        items = [];
      }
      items.forEach(async id => {
        try {
          const res = await this.ctx.curl(`${base}/v0/item/${id}.json'`, {
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
            const reposNews = await this.ctx.model.ReposNews.findOne({
              where: {
                url: itemData.url,
                item_id: itemData.id,
              },
            });
            if (reposNews) {
              const repos = await this.ctx.model.Repos.findOne({
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
              const repos = await this.ctx.model.Repos.findOne({
                where: {
                  slug: `${found[1]}-${found[2]}`,
                },
              });
              let reposId = 0;
              if (repos) {
                reposId = repos.id;
              } else {
                // const githubUrl = `https://github.com/${found[1]}/${found[2]}`;
                // this.ctx.app.queue.add({ job: 'fetchRepos', data: { url: githubUrl } });
              }
              this.ctx.model.ReposNews.create({
                url: itemData.url,
                time: moment(itemData.time).toDate().getTime() / 1000,
                repos_id: reposId,
                title: itemData.title.replace('Show HN: ', ''),
                score: itemData.score,
                item_id: itemData.id,
                post_date: moment(itemData).format('YYYY-MM-DD'),
              });
            }
          }
        } catch (e) {
          this.app.logger.error(e);
        }
      });
    }
    return true;
  }
}

module.exports = NewsSync;
