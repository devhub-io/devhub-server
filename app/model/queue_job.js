'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;

  return app.model.define('queue_job', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    queue: {
      type: STRING,
    },
    payload: {
      type: TEXT,
    },
    attempts: {
      type: INTEGER(3).UNSIGNED,
    },
    reserved: {
      type: INTEGER(3).UNSIGNED,
    },
    reserved_at: {
      type: DATE,
      allowNull: true,
    },
    available_at: {
      type: DATE,
      allowNull: true,
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
    updated_at: {
      type: DATE,
      allowNull: true,
    },
  }, {
    tableName: 'queue_jobs',
  });
};
