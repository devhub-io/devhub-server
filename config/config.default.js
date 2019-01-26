'use strict';

const env = require('../.env.js');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545906655111_6691';

  // add your config here
  config.middleware = [];

  // ORM
  exports.sequelize = {
    dialect: 'mysql',
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
  };

  // log
  exports.logrotator = {
    // list of files that will be rotated by hour
    filesRotateByHour: [],
    // rotate the file by hour use specified delimiter
    hourDelimiter: '-',
    // list of files that will be rotated by size
    filesRotateBySize: [],
    // Max file size to judge if any file need rotate
    maxFileSize: 50 * 1024 * 1024,
    // pieces rotate by size
    maxFiles: 10,
    // time interval to judge if any file need rotate
    rotateDuration: 60000,
    // keep max days log files, default is `31`. Set `0` to keep all logs
    maxDays: 0,
  };

  exports.security = {
    domainWhiteList: [ env.CORS_DOMAIN ],
    csrf: false,
  };

  exports.redis = {
    client: {
      port: env.REDIS_PORT,
      host: env.REDIS_HOST,
      password: env.REDIS_PASSWORD,
      db: 0,
    },
  };

  exports.elasticsearch = {
    host: env.ELASTICSEARCH_HOST,
    index: 'devhub',
  };

  exports.github = {
    id: env.GITHUB_CLIENT_ID,
    secret: env.GITHUB_CLIENT_SECRET,
  };

  exports.alinode = {
    appid: env.ALINODE_APPID,
    secret: env.ALINODE_SECRET,
  };

  exports.passportJwt = {
    secret: env.JWT_SECRET,
  };

  exports.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  };

  exports.httpclient = {
    // whether to enable local DNS cache, default disable, enable will have two characteristics
    // 1. All DNS lookup will prefer to use the cache by default, even DNS query error does not affects the application
    // 2. For the same hostname, query only once during the interval of dnsCacheLookupInterval (default 10s)
    enableDNSCache: true,
    // minimum interval of DNS query on the same hostname
    dnsCacheLookupInterval: 10000,
    // maximum number of hostname DNS cache simultaneously, default 1000
    dnsCacheMaxLength: 1000,

    request: {
      // default timeout of request
      timeout: 60000,
    },

    httpAgent: {
      // default enable http KeepAlive
      keepAlive: true,
      // idle KeepAlive socket can survive for 4 seconds
      freeSocketTimeout: 4000,
      // when sockets have no activity for more than 30s, it will be processed as timeout
      timeout: 30000,
      // maximum number of sockets allow to be created
      maxSockets: Number.MAX_SAFE_INTEGER,
      // maximum number of idle sockets
      maxFreeSockets: 256,
    },

    httpsAgent: {
      // default enable https KeepAlive
      keepAlive: true,
      // idle KeepAlive socket can survive for 4 seconds
      freeSocketTimeout: 4000,
      // when sockets have no activity for more than 30s, it will be processed as timeout
      timeout: 30000,
      // maximum number of sockets allow to be created
      maxSockets: Number.MAX_SAFE_INTEGER,
      // maximum number of idle sockets
      maxFreeSockets: 256,
    },
  };

  exports.io = {
    init: { }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [],
      },
    },
  };

  return config;
};
