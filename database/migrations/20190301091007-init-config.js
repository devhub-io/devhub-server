'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'config',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        key: {
          type: STRING,
          unique: true,
        },
        value: {
          type: STRING(1024),
        },
        remark: {
          type: STRING,
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
