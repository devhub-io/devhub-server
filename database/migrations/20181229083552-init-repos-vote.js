'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'repos_vote',
      {
        repos_id: {
          type: INTEGER(11),
          allowNull: false,
        },
        reliable: {
          type: INTEGER(4),
          allowNull: false,
        },
        recommendation: {
          type: INTEGER(4),
          allowNull: false,
        },
        documentation: {
          type: INTEGER(4),
          allowNull: false,
        },
        ip: {
          type: STRING(64),
          allowNull: false,
          defaultValue: '',
        },
        user_agent: {
          type: STRING(255),
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
        charset: 'utf8',
      }
    );
  },
};
