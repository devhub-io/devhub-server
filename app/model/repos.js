'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE, literal } = app.Sequelize;

  const Repos = app.model.define('repos', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(255),
      allowNull: false,
    },
    category_id: {
      type: INTEGER(6),
      allowNull: false,
      defaultValue: 0,
    },
    slug: {
      type: STRING(255),
      allowNull: false,
      unique: true,
    },
    image: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: STRING(255),
      allowNull: false,
    },
    language: {
      type: STRING(255),
      allowNull: false,
    },
    readme: {
      type: TEXT,
      allowNull: false,
    },
    homepage: {
      type: STRING(255),
      allowNull: false,
    },
    github: {
      type: STRING(255),
      allowNull: false,
    },
    stargazers_count: {
      type: INTEGER(11),
      allowNull: false,
    },
    watchers_count: {
      type: INTEGER(11),
      allowNull: false,
    },
    open_issues_count: {
      type: INTEGER(11),
      allowNull: false,
    },
    forks_count: {
      type: INTEGER(11),
      allowNull: false,
    },
    subscribers_count: {
      type: INTEGER(11),
      allowNull: false,
    },
    issue_response: {
      type: INTEGER(11),
      allowNull: false,
    },
    status: {
      type: INTEGER(4),
      allowNull: false,
      defaultValue: 0,
    },
    repos_created_at: {
      type: DATE,
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    repos_updated_at: {
      type: DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
    },
    fetched_at: {
      type: DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
    updated_at: {
      type: DATE,
      allowNull: true,
    },
    user_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    is_recommend: {
      type: INTEGER(1),
      allowNull: false,
    },
    view_number: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    trends: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    owner: {
      type: STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    repo: {
      type: STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    analytics_at: {
      type: DATE,
      allowNull: true,
    },
    cover: {
      type: STRING(255),
      allowNull: false,
    },
    have_questions: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    document_url: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },
  }, {
    tableName: 'repos',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });

  Repos.associate = function() {
    // Repos.belongsTo(app.model.Category);
    // Repos.belongsTo(app.model.User);
    // app.model.Repos.hasMany(app.model.ReposTag, { as: 'tags', foreignKey: 'repos_id', sourceKey: 'id' });
    app.model.Repos.hasOne(app.model.ReposTopic, { as: 'topic', foreignKey: 'repos_id', sourceKey: 'id' });
    // Repos.hasMany(app.model.ReposContributor);
    // Repos.hasMany(app.model.ReposLanguage);
    // Repos.hasMany(app.model.ReposBadge);
    // Repos.hasOne(app.model.ReposLicense);
    // Repos.hasMany(app.model.ReposQuestion);
    // Repos.hasMany(app.model.ReposNews);
  };

  return Repos;
};
