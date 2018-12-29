'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;

    return queryInterface.createTable(
      'repos_contributors',
      {
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
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
          defaultValue: '0',
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
