'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('developer', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: STRING(100),
      allowNull: false,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    github_id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
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
      type: STRING(20),
      allowNull: false,
    },
    site_admin: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    company: {
      type: STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    blog: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    location: {
      type: STRING(200),
      allowNull: false,
      defaultValue: '',
    },
    email: {
      type: STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    public_repos: {
      type: INTEGER(6),
      allowNull: false,
      defaultValue: 0,
    },
    public_gists: {
      type: INTEGER(6),
      allowNull: false,
      defaultValue: 0,
    },
    followers: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    following: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    site_created_at: {
      type: DATE,
      allowNull: true,
    },
    site_updated_at: {
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
    view_number: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    fetched_at: {
      type: DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
    },
    analytics_at: {
      type: DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
    },
    rating: {
      type: 'DOUBLE(8,2)',
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    tableName: 'developer',
  });
};
