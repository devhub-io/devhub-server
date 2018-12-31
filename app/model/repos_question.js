'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return app.model.define('repos_question', {
    repos_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: STRING(255),
      allowNull: false,
    },
    link: {
      type: STRING(255),
      allowNull: false,
    },
    view_count: {
      type: INTEGER(11),
      allowNull: false,
    },
    answer_count: {
      type: INTEGER(11),
      allowNull: false,
    },
    score: {
      type: INTEGER(11),
      allowNull: false,
    },
    question_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    creation_date: {
      type: DATE,
      allowNull: true,
    },
    last_edit_date: {
      type: DATE,
      allowNull: true,
    },
    last_activity_date: {
      type: DATE,
      allowNull: true,
    },
  }, {
    tableName: 'repos_questions',
    timestamps: false,
  });
};
