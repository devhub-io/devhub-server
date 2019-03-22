'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('config', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: STRING,
      unique: true,
    },
    value: {
      type: STRING(1024),
    },
    remark: {
      type: STRING,
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
    tableName: 'config',
  });
};
