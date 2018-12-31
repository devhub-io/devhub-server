'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;

  const ReposContributor = app.model.define('repos_contributor', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    login: {
      type: STRING(100),
      allowNull: false,
    },
    avatar_url: {
      type: STRING(255),
      allowNull: false,
    },
    html_url: {
      type: STRING(255),
      allowNull: false,
    },
    type: {
      type: STRING(15),
      allowNull: false,
    },
    site_admin: {
      type: INTEGER(1),
      allowNull: false,
    },
    contributions: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    tableName: 'repos_contributors',
    timestamps: false,
  });

  ReposContributor.associate = function() {
    app.model.ReposContributor.hasOne(app.model.Repos, { as: 'repos', foreignKey: 'id', sourceKey: 'repos_id' });
  };

  return ReposContributor;
};
