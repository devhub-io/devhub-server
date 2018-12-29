'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATEONLY } = Sequelize;

    return queryInterface.createTable(
      'repos_trends',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        overall: {
          type: INTEGER(11),
          allowNull: false,
        },
        trend: {
          type: INTEGER(11),
          allowNull: false,
        },
        date: {
          type: DATEONLY,
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
