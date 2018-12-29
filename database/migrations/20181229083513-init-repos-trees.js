'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;

    return queryInterface.createTable(
      'repos_trees',
      {
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        commit_sha: {
          type: STRING(50),
          allowNull: false,
        },
        sha: {
          type: STRING(50),
          allowNull: false,
        },
        path: {
          type: STRING(255),
          allowNull: false,
        },
        mode: {
          type: STRING(10),
          allowNull: false,
        },
        type: {
          type: STRING(15),
          allowNull: false,
        },
        url: {
          type: STRING(255),
          allowNull: false,
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
