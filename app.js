'use strict';

const Queue = require('bull');

module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    // app.cities = await app.curl('http://example.com/city.json', {
    //   method: 'GET',
    //   dataType: 'json',
    // });

    // 也可以通过以下方式来调用 Service
    // const ctx = app.createAnonymousContext();
    // app.cities = await ctx.service.cities.load();
  });

  app.queue = createQueue(app.config, app);
  app.queue.process(async function(job, done) {
    try {
      const ctx = app.createAnonymousContext();
      await ctx.service.job.process(job.data);
      done();
    } catch (e) {
      app.logger.error(`[system] Queue Error ${e}`);
      done(new Error(e));
    }
  });

};

function createQueue(config, app) {
  const { name } = config;
  const queue = new Queue(name, config);

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
