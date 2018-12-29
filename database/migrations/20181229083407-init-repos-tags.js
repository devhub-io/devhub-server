'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;

    return queryInterface.createTable(
      'repos_tags',
      {
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        name: {
          type: STRING(20),
          allowNull: false,
        },
        zipball_url: {
          type: STRING(255),
          allowNull: false,
        },
        tarball_url: {
          type: STRING(255),
          allowNull: false,
        },
        commit_sha: {
          type: STRING(50),
          allowNull: false,
        },
      },
      {
        engine: 'InnoDB',
        charset: 'utf8',
      }
    );
  },
};
