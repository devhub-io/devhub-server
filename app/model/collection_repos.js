'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const CollectionRepos = app.model.define('collection_repos', {
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
    status: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 1,
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
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });

  CollectionRepos.associate = function() {
    app.model.CollectionRepos.belongsTo(app.model.Repos, { as: 'repos', foreignKey: 'repos_id', sourceKey: 'repos_id' });
  };

  return CollectionRepos;
};
