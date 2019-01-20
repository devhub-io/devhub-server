'use strict';

const Service = require('egg').Service;

class QueueService extends Service {

  async processJob(payload) {
    if (typeof this.ctx.service.job[payload.job] === 'function') {
      return await this.ctx.service.job[payload.job](payload.data);
    }
    return false;
  }

  async addJob({ queue, payload }) {
    const queueJob = await this.ctx.model.QueueJob.create({
      queue,
      payload: JSON.stringify(payload),
      reserved_at: null,
      available_at: null,
    });
    if (queueJob) {
      payload.jobId = queueJob.id;
      await this.app.queue.add({ job: queue, data: payload });
      return true;
    }
    return false;
  }

  async failJob(jobId) {
    const queueJob = await this.ctx.model.QueueJob.findOne({
      where: {
        id: jobId,
      },
    });
    if (queueJob) {
      queueJob.reserved = queueJob.reserved + 1;
      queueJob.reserved_at = new Date();
      await queueJob.save();
      return true;
    }
    return false;
  }

  async finishJob(jobId) {
    return await this.ctx.model.QueueJob.destroy({
      where: {
        id: jobId,
      },
      limit: 1,
    });
  }

  async replayJob(jobId) {
    const queueJob = await this.ctx.model.QueueJob.findOne({
      where: {
        id: jobId,
      },
    });
    if (queueJob) {
      const payload = JSON.parse(queueJob.payload);
      payload.jobId = queueJob.id;
      await this.app.queue.add({ job: queueJob.queue, data: payload });
      queueJob.attempts = queueJob.attempts + 1;
      await queueJob.save();
      return true;
    }
    return false;
  }

}

module.exports = QueueService;
