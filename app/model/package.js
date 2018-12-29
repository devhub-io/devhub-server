'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE } = app.Sequelize;

  return app.model.define('package', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    provider: {
      type: STRING(50),
      allowNull: false,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    repository: {
      type: STRING(255),
      allowNull: false,
    },
    json: {
      type: TEXT,
      allowNull: false,
    },
    fetched_at: {
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
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    package_url: {
      type: STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'packages',
  });
};
