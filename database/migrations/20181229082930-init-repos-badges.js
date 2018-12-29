'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;

    return queryInterface.createTable(
      'repos_badges',
      {
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        name: {
          type: STRING(50),
          allowNull: false,
        },
        url: {
          type: STRING(255),
          allowNull: false,
        },
        type: {
          type: STRING(15),
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
