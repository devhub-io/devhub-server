'use strict';

const constant = require('../constant');

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('collection', {
    id: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    topic_id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    parent_id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    slug: {
      type: STRING(255),
      allowNull: false,
      unique: true,
    },
    title: {
      type: STRING(255),
      allowNull: false,
    },
    image: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    sort: {
      type: INTEGER(6),
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    view_number: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: INTEGER(4),
      allowNull: false,
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
    tableName: 'collections',
    defaultScope: {
      where: {
        status: constant.ENABLE,
      },
    },
  });
};
