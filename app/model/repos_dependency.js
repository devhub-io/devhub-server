'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('repos_dependency', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    source: {
      type: STRING(15),
      allowNull: false,
    },
    env: {
      type: STRING(15),
      allowNull: false,
    },
    package: {
      type: STRING(100),
      allowNull: false,
    },
    version: {
      type: STRING(50),
      allowNull: false,
    },
    version_condition: {
      type: STRING(10),
      allowNull: false,
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
    tableName: 'repos_dependencies',
  });
};
