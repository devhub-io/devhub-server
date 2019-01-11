'use strict';

const Subscription = require('egg').Subscription;
const sm = require('sitemap');
const fs = require('fs');

class Sitemap extends Subscription {

  static get schedule() {
    return {
      interval: '1w',
      type: 'worker',
    };
  }

  async subscribe() {
    // const app = this.app;
    // const ctx = this.ctx;

    const hostname = 'https://devhub.io';
    const sitemap = sm.createSitemap({
      hostname,
      cacheTime: 7 * 24 * 60 * 60 * 1000,
      urls: [
        {
          url: '/',
          changefreq: 'weekly',
          priority: 0.8,
          lastmodISO: '2015-06-27T15:30:00.000Z',
        },
        { url: '/page1', changefreq: 'weekly', priority: 0.8 },
      ],
    });
    fs.writeFileSync('./sitemap.xml', sitemap.toString());

    const smi = sm.buildSitemapIndex({
      urls: [
        hostname + '/sitemap1.xml',
        hostname + '/sitemap2.xml',
      ],
      xslUrl: 'https://example.com/style.xsl', // optional
    });
    fs.writeFileSync('./sitemap.xml', smi.toString());

    return true;
  }
}

module.exports = Sitemap;
