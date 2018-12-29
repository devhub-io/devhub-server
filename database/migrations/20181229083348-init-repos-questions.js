'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'repos_questions',
      {
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
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
      },
      {
        engine: 'InnoDB',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  },
};
