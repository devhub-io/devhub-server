'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'password_resets',
      {
        email: {
          type: STRING(255),
          allowNull: false,
        },
        token: {
          type: STRING(255),
          allowNull: false,
        },
        created_at: {
          type: DATE,
          allowNull: true,
        },
      },
      {
        engine: 'InnoDB',
        charset: 'utf8',
      }
    );
  },
};
