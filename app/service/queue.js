'use strict';

const Service = require('egg').Service;

class QueueService extends Service {

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

}

module.exports = QueueService;
