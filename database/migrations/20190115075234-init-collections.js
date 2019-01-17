'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'collections',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        topic_id: {
          type: INTEGER(11),
          allowNull: false,
          defaultValue: 0,
        },
        parent_id: {
          type: INTEGER(11),
          allowNull: false,
          defaultValue: 0,
        },
        slug: {
          type: STRING(255),
          allowNull: false,
        },
        title: {
          type: STRING(255),
          allowNull: false,
        },
        image: {
          type: STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        sort: {
          type: INTEGER(6),
          allowNull: false,
          defaultValue: 0,
        },
        user_id: {
          type: INTEGER(11),
          allowNull: false,
          defaultValue: 0,
        },
        view_number: {
          type: INTEGER(11),
          allowNull: false,
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
