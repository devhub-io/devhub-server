'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'collection',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: STRING(255),
          allowNull: false,
        },
        image: {
          type: STRING(255),
          allowNull: false,
        },
        slug: {
          type: STRING(255),
          allowNull: false,
          unique: true,
        },
        sort: {
          type: INTEGER(6),
          allowNull: false,
        },
        is_enable: {
          type: INTEGER(1),
          allowNull: false,
          defaultValue: '1',
        },
        created_at: {
          type: DATE,
          allowNull: true,
        },
        updated_at: {
          type: DATE,
          allowNull: true,
        },
        user_id: {
          type: INTEGER(11),
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
