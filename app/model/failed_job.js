'use strict';

module.exports = app => {
  const { INTEGER, TEXT, DATE, literal } = app.Sequelize;

  return app.model.define('failed_job', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    connection: {
      type: TEXT,
      allowNull: false,
    },
    queue: {
      type: TEXT,
      allowNull: false,
    },
    payload: {
      type: TEXT,
      allowNull: false,
    },
    exception: {
      type: TEXT,
      allowNull: false,
    },
    failed_at: {
      type: DATE,
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
  }, {
    tableName: 'failed_jobs',
    timestamps: false,
  });
};
