'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const env = require('../../../.env');
const queryString = require('querystring');

describe('test/app/service/api.test.js', () => {

  describe('librariesioReposSearch', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const query = { keywords: 'node', page: 1, limit: 10 };
      app.mockHttpclient(`https://libraries.io/api/search?q=${query.keywords}&page=${query.page}&per_page=${query.limit}&api_key=${env.LIBRARIESIO_KEY}`, {
        data: [{
          name: 'egg',
          platform: 'NPM',
          description: 'A web framework\'s framework for Node.js',
          homepage: 'https://github.com/eggjs/egg',
          repository_url: 'https://github.com/eggjs/egg',
          normalized_licenses: [ 'MIT' ],
          rank: 23,
          latest_release_published_at: '2018-12-20T03:18:45.918Z',
          latest_release_number: '2.14.2',
          language: 'JavaScript',
          status: null,
          package_manager_url: 'https://www.npmjs.com/package/egg',
          stars: 11166,
          forks: 1122,
          keywords: [ 'framework', 'koa', 'egg', 'eggjs', 'enterprise', 'koa-middleware', 'koa2', 'node-framework', 'nodejs' ],
          latest_stable_release: {
            id: 17187026,
            project_id: 279056,
            number: '2.14.2',
            published_at: '2018-12-20T03:18:45.918Z',
            created_at: '2018-12-20T03:19:00.071Z',
            updated_at: '2018-12-20T03:19:00.071Z',
            runtime_dependencies_count: 41,
          },
          latest_download_url: 'https://registry.npmjs.org/egg/-/egg-2.14.2.tgz',
          dependents_count: 788,
          dependent_repos_count: 1088,
          latest_stable_release_number: '2.14.2',
          latest_stable_release_published_at: '2018-12-20T03:18:45.918Z',
          versions: [
            { number: '2.7.1', published_at: '2018-04-17T03:58:42.943Z' },
            { number: '2.8.0', published_at: '2018-05-03T04:01:25.740Z' },
            { number: '2.8.1', published_at: '2018-05-05T09:22:23.194Z' },
            { number: '2.9.0', published_at: '2018-06-07T08:51:36.286Z' },
            { number: '2.9.1', published_at: '2018-06-20T08:23:27.867Z' }],
        }],
      });
      const res = await ctx.service.api.librariesioReposSearch(query);
      assert(res.length === 1);

      const query2 = { keywords: 'node' };
      app.mockHttpclient(`https://libraries.io/api/search?q=${query.keywords}&page=${query.page}&per_page=${query.limit}&api_key=${env.LIBRARIESIO_KEY}`, {
        data: [],
        status: 404,
      });
      const resErr = await ctx.service.api.librariesioReposSearch(query2);
      assert(resErr.length === 0);
    });
  });

  describe('smmsImageUpload', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      app.mockHttpclient('https://sm.ms/api/upload', {
        data: {
          code: 'success',
          data:
            { width: 164,
              height: 162,
              filename: 'demo.png',
              storename: '5c4342a4dc1a3.png',
              size: 4524,
              path: '/2019/01/19/5c4342a4dc1a3.png',
              hash: 'EvKYq7uy4xwrdSZ',
              timestamp: 1547911844,
              ip: '117.136.41.59',
              url: 'https://i.loli.net/2019/01/19/5c4342a4dc1a3.png',
              delete: 'https://sm.ms/delete/EvKYq7uy4xwrdSZ',
            },
        },
      });
      const res = await ctx.service.api.smmsImageUpload(__filename);
      assert(res);
      const resErr = await ctx.service.api.smmsImageUpload(__dirname + '/404.file');
      assert(resErr === false);
    });
  });

  describe('bearychatSendMessage', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      app.mockHttpclient(env.BEARYCHAT_WEBHOOK, {
        data: { code: 0, result: null },
      });
      const res = await ctx.service.api.bearychatSendMessage('hi');
      assert(res);
    });
  });

  describe('wikipeidaSummery', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const title = 'Javascript';
      const extract = 'JavaScript (), often abbreviated as JS, is a high-level, interpreted programming language';
      app.mockHttpclient(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${title}`, {
        data: {
          batchcomplete: '',
          query: {
            redirects:
              [{ from: 'Javascript', to: 'JavaScript' }],
            pages: {
              9845: {
                pageid: 9845,
                ns: 0,
                title: 'JavaScript',
                extract,
              },
            },
          },
        },
      });
      const res = await ctx.service.api.wikipeidaSummery(title);
      assert(res === extract);
      app.mockHttpclient(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${title}`, {
        data: {},
        status: 404,
      });
      const resErr = await ctx.service.api.wikipeidaSummery(title);
      assert(resErr === false);
    });
  });

  describe('cloudflareDashboard', () => {
    it('should work', async () => {
      const ctx = app.mockContext({});
      const query = {
        since: '-43200',
      };
      app.mockHttpclient(`https://api.cloudflare.com/client/v4/zones/${env.CLOUDFLARE_ZONE_ID}/analytics/dashboard?${queryString.stringify(query)}`, {
        data: {
          success: true,
          query: {
            since: '2018-12-27T00:00:00Z',
            until: '2019-01-26T00:00:00Z',
            time_delta: 1440,
          },
          errors: [],
          messages: [],
          result: {
            timeseries: [
              {
                bandwidth: {
                  all: 2465634867,
                  cached: 104891553,
                  content_type: {
                    css: 32108740,
                    empty: 29166,
                    html: 1587726696,
                    javascript: 14137953,
                    jpeg: 4342377,
                    json: 764,
                    'octet-stream': 389098,
                    other: 133655155,
                    plain: 304756,
                    png: 44145327,
                    xml: 648794835,
                  },
                  country: {
                    AE: 187771,
                    AL: 79124,
                    AM: 111263,
                    BO: 200232,
                    US: 1433980985,
                    UY: 62733,
                    UZ: 126735,
                    VE: 53455,
                    VN: 3689859,
                    XX: 854226,
                    YE: 41734,
                    ZA: 566895,
                    ZM: 70874,
                  },
                  ssl: {
                    encrypted: 2465097571,
                    unencrypted: 537296,
                  },
                  ssl_protocol: {
                    TLSv1: 257,
                    'TLSv1.1': 4,
                    'TLSv1.2': 130329,
                    'TLSv1.3': 29117,
                    none: 709,
                  },
                  uncached: 2360743314,
                },
                pageviews: {
                  all: 133821,
                  search_engine: {
                    applebot: 3,
                    baiduspider: 22,
                    bingbot: 9351,
                    facebookexternalhit: 2,
                    googlebot: 21500,
                    twitterbot: 3,
                    yandexbot: 58564,
                  },
                },
                requests: {
                  all: 160416,
                  cached: 18019,
                  content_type: {
                    css: 5542,
                    empty: 211,
                    html: 142168,
                    javascript: 5568,
                    jpeg: 120,
                    json: 2,
                    'octet-stream': 5,
                    other: 3534,
                    plain: 431,
                    png: 2538,
                    xml: 297,
                  },
                  country: {
                    AE: 39,
                    AL: 16,
                    AM: 21,
                    UG: 23,
                    US: 115989,
                    UY: 9,
                    UZ: 15,
                    VE: 12,
                    VN: 316,
                    XX: 95,
                    YE: 7,
                    ZA: 91,
                    ZM: 7,
                  },
                  http_status: {
                    200: 151848,
                    301: 697,
                    302: 4071,
                    304: 56,
                    400: 1,
                    403: 1478,
                    404: 2106,
                    405: 3,
                    499: 155,
                    504: 1,
                  },
                  ip_class: {
                    badHost: 1627,
                    monitoringService: 17,
                    noRecord: 67753,
                    searchEngine: 83257,
                    tor: 1,
                    whitelist: 7761,
                  },
                  ssl: {
                    encrypted: 159707,
                    unencrypted: 709,
                  },
                  ssl_protocol: {
                    TLSv1: 257,
                    'TLSv1.1': 4,
                    'TLSv1.2': 130329,
                    'TLSv1.3': 29117,
                    none: 709,
                  },
                  uncached: 142397,
                },
                since: '2019-01-24T00:00:00Z',
                threats: {
                  all: 1,
                  country: {
                    US: 1,
                  },
                  type: {
                    'bic.ban.unknown': 1,
                  },
                },
                uniques: {
                  all: 4561,
                },
                until: '2019-01-25T00:00:00Z',
              },
              {
                bandwidth: {
                  all: 2770389744,
                  cached: 100626202,
                  content_type: {
                    css: 30407358,
                    empty: 27004,
                    html: 1859800590,
                    javascript: 13230057,
                    jpeg: 4453508,
                    json: 1528,
                    'octet-stream': 218170,
                    other: 165653487,
                    plain: 270985,
                    png: 43984476,
                    xml: 652342581,
                  },
                  country: {
                    AE: 212463,
                    AG: 27276,
                    AL: 191861,
                    AM: 208584,
                    AR: 957412,
                    AT: 1093575,
                    VN: 4655103,
                    XX: 653334,
                    YE: 56880,
                    ZA: 645280,
                    ZM: 54161,
                    ZW: 25482,
                  },
                  ssl: {
                    encrypted: 2754316119,
                    unencrypted: 16073625,
                  },
                  ssl_protocol: {
                    TLSv1: 529,
                    'TLSv1.2': 114719,
                    'TLSv1.3': 28219,
                    none: 26371,
                  },
                  uncached: 2669763542,
                },
                pageviews: {
                  all: 117993,
                  search_engine: {
                    applebot: 1,
                    baiduspider: 24477,
                    bingbot: 9811,
                    facebookexternalhit: 2,
                    googlebot: 8108,
                    linkedinbot: 1,
                    twitterbot: 3,
                    yandexbot: 43975,
                  },
                },
                requests: {
                  all: 169838,
                  cached: 16794,
                  content_type: {
                    css: 5290,
                    empty: 206,
                    html: 152304,
                    javascript: 5261,
                    jpeg: 123,
                    json: 4,
                    'octet-stream': 9,
                    other: 3540,
                    plain: 387,
                    png: 2465,
                    xml: 249,
                  },
                  country: {
                    AE: 40,
                    AG: 1,
                    AL: 33,
                    US: 75332,
                    UZ: 6,
                    VE: 43,
                    VN: 324,
                    XX: 99,
                    YE: 12,
                    ZA: 85,
                    ZM: 13,
                    ZW: 4,
                  },
                  http_status: {
                    200: 135265,
                    206: 1,
                    301: 26364,
                    302: 4648,
                    304: 53,
                    403: 933,
                    404: 2411,
                    405: 4,
                    499: 153,
                    504: 1,
                    521: 5,
                  },
                  ip_class: {
                    badHost: 1017,
                    monitoringService: 14,
                    noRecord: 54733,
                    searchEngine: 57067,
                    tor: 7,
                    whitelist: 57000,
                  },
                  ssl: {
                    encrypted: 143467,
                    unencrypted: 26371,
                  },
                  ssl_protocol: {
                    TLSv1: 529,
                    'TLSv1.2': 114719,
                    'TLSv1.3': 28219,
                    none: 26371,
                  },
                  uncached: 153044,
                },
                since: '2019-01-25T00:00:00Z',
                threats: {
                  all: 4,
                  country: {
                    DE: 2,
                    US: 1,
                    VN: 1,
                  },
                  type: {
                    'bic.ban.unknown': 4,
                  },
                },
                uniques: {
                  all: 4567,
                },
                until: '2019-01-26T00:00:00Z',
              },
            ],
            totals: {
              bandwidth: {
                all: 60526567971,
                cached: 2768071089,
                content_type: {
                  css: 792228943,
                  empty: 839655,
                  html: 34882676306,
                  javascript: 348926393,
                  jpeg: 144556935,
                  json: 23847,
                  'octet-stream': 5825182,
                  other: 4761534548,
                  plain: 8222138,
                  png: 1102779888,
                  svg: 28673,
                  xml: 18478925463,
                },
                country: {
                  AD: 418270,
                  AE: 7404759,
                  AF: 401221,
                  AG: 27276,
                  AL: 2965854,
                  AM: 2372606,
                  AO: 360854,
                  AQ: 29867,
                  ZM: 665245,
                  ZW: 260962,
                },
                ssl: {
                  encrypted: 60397162434,
                  unencrypted: 129405537,
                },
                ssl_protocol: {
                  TLSv1: 25400,
                  'TLSv1.1': 160,
                  'TLSv1.2': 2812900,
                  'TLSv1.3': 775141,
                  none: 61569,
                },
                uncached: 57758496882,
              },
              pageviews: {
                all: 2857499,
                search_engine: {
                  applebot: 65,
                  baiduspider: 25134,
                  bingbot: 310870,
                  duckduckgobot: 34,
                  facebookexternalhit: 84,
                  googlebot: 303236,
                  linkedinbot: 3,
                  twitterbot: 68,
                  yandexbot: 1168943,
                },
              },
              requests: {
                all: 3675170,
                cached: 456274,
                content_type: {
                  css: 137587,
                  empty: 6115,
                  html: 3215680,
                  javascript: 137177,
                  jpeg: 4015,
                  json: 46,
                  'octet-stream': 109,
                  other: 92937,
                  plain: 11712,
                  png: 61439,
                  svg: 2,
                  xml: 8351,
                },
                country: {
                  AD: 40,
                  AE: 1023,
                  AF: 55,
                  AG: 1,
                  AL: 437,
                  US: 2435076,
                  UY: 301,
                  UZ: 480,
                  VC: 2,
                  VE: 550,
                  VI: 9,
                  VN: 9549,
                  VU: 8,
                  XK: 10,
                  XX: 1881,
                  YE: 94,
                  ZA: 2374,
                  ZM: 100,
                  ZW: 43,
                },
                http_status: {
                  200: 3310026,
                  206: 21,
                  301: 54300,
                  302: 180376,
                  304: 1663,
                  400: 26,
                  403: 40989,
                  404: 75874,
                  405: 114,
                  408: 1,
                  409: 5,
                  419: 4,
                  499: 4450,
                  500: 34,
                  502: 502,
                  504: 14,
                  520: 498,
                  521: 117,
                  522: 111,
                  525: 6035,
                  530: 10,
                },
                ip_class: {
                  backupService: 8,
                  badHost: 47136,
                  monitoringService: 496,
                  noRecord: 1717209,
                  scan: 27,
                  searchEngine: 1645688,
                  tor: 688,
                  whitelist: 263918,
                },
                ssl: {
                  encrypted: 3613601,
                  unencrypted: 61569,
                },
                ssl_protocol: {
                  TLSv1: 25400,
                  'TLSv1.1': 160,
                  'TLSv1.2': 2812900,
                  'TLSv1.3': 775141,
                  none: 61569,
                },
                uncached: 3218896,
              },
              since: '2018-12-27T00:00:00Z',
              threats: {
                all: 1104,
                country: {
                  AT: 7,
                  BE: 1,
                  BS: 1,
                  CA: 1,
                  KR: 54,
                  KY: 1,
                  RU: 6,
                  SC: 1,
                  UA: 72,
                  US: 811,
                  VN: 6,
                  XX: 2,
                },
                type: {
                  'bic.ban.unknown': 1104,
                },
              },
              uniques: {
                all: 82195,
              },
              until: '2019-01-26T00:00:00Z',
            },
          },
        },
      });
      const res = await ctx.service.api.cloudflareDashboard();
      assert(res.timeseries);
      app.mockHttpclient(`https://api.cloudflare.com/client/v4/zones/${env.CLOUDFLARE_ZONE_ID}/analytics/dashboard?${queryString.stringify(query)}`, {
        data: {},
        status: 404,
      });
      const resErr = await ctx.service.api.cloudflareDashboard();
      assert(resErr === false);
    });
  });

});
