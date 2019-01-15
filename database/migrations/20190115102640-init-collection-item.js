'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'collection_items',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        collection: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
        },
        title: {
          type: STRING,
        },
        type: {
          type: STRING(20),
        },
        foreign_id: {
          type: INTEGER(10).UNSIGNED,
          defaultValue: 0,
        },
        user_id: {
          type: INTEGER(10).UNSIGNED,
          defaultValue: 0,
        },
        status: {
          type: INTEGER(4),
          allowNull: false,
          defaultValue: 0,
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
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  },
};
