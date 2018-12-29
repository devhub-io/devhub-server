'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  return app.model.define('collection_repos', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    collection_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    sort: {
      type: INTEGER(4),
      allowNull: false,
    },
    is_enable: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: '1',
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
    tableName: 'collection_repos',
  });
};
