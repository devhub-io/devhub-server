'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize;

    return queryInterface.createTable(
      'role_user',
      {
        user_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
        },
        role_id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
        },
      },
      {
        engine: 'InnoDB',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  },
};
