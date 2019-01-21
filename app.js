'use strict';

const Queue = require('bull');
const Rollbar = require('rollbar');
const env = require('./.env');
const elasticsearch = require('elasticsearch');

module.exports = app => {

  // Error
  app.on('error', err => {
    // report error
    if (err.status !== 404) {
      const rollbar = new Rollbar({
        accessToken: env.ROLLBAR_ACCESS_TOKEN,
        captureUncaught: true,
        captureUnhandledRejections: true,
      });
      rollbar.error(err);
    }
  });

  // Queue
  app.queue = createQueue(app.config, app);
  app.queue.process(async function(job, done) {
    const ctx = app.createAnonymousContext();
    try {
      const state = await ctx.service.queue.processJob(job.data);
      state ? ctx.service.queue.finishJob(job.data.data.jobId) : ctx.service.queue.failJob(job.data.data.jobId);
      done();
    } catch (e) {
      app.logger.error(`[system] Queue Error ${e}`);
      ctx.service.queue.failJob(job.data.data.jobId);
      done(new Error(e));
    }
  });

  // ES
  app.elasticsearch = new elasticsearch.Client({
    hosts: [ app.config.elasticsearch.host ],
  });

  // JWT
  app.passport.verify(async (ctx, user) => {
    // check user
    // assert(user.provider, 'user.provider should exists');
    // assert(user.payload, 'user.payload should exists');
    // console.log('verify', user);

    // find user from database
    const existsUser = await ctx.model.User.findOne({
      where: {
        id: user.payload.sub,
      },
    });
    if (existsUser) return existsUser;
  });

};

function createQueue(config, app) {
  const { name } = config;
  const queue = new Queue(name, { redis: config.redis.client });
  /* istanbul ignore next */
  queue.on('error', error => {
    app.coreLogger.error(error);
    process.exit(1);
  });

  app.beforeStart(() => {
    app.logger.info(`[system] Queue ${name} is OK.`);
  });

  return queue;
}
