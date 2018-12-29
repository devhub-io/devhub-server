'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;

    return queryInterface.createTable(
      'repos_licenses',
      {
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        key: {
          type: STRING(20),
          allowNull: false,
        },
        name: {
          type: STRING(50),
          allowNull: false,
        },
        spdx_id: {
          type: STRING(20),
          allowNull: false,
        },
        featured: {
          type: INTEGER(1),
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
