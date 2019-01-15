'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('topic', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
    },
    slug: {
      type: STRING,
      unique: true,
    },
    description: {
      type: STRING,
    },
    homepage: {
      type: STRING,
    },
    github: {
      type: STRING,
    },
    wiki: {
      type: STRING,
    },
    user_id: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
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
    tableName: 'topics',
  });
};
