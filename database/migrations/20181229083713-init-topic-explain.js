'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'topic_explain',
      {
        topic: {
          type: STRING(50),
          allowNull: false,
        },
        explain: {
          type: STRING(1000),
          allowNull: false,
        },
        created_at: {
          type: DATE,
          allowNull: true,
        },
        updated_at: {
          type: DATE,
          allowNull: true,
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
