'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;

    return queryInterface.createTable(
      'developer',
      {
        id: {
          type: INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        login: {
          type: STRING(100),
          allowNull: false,
        },
        name: {
          type: STRING(100),
          allowNull: false,
        },
        github_id: {
          type: INTEGER(11),
          allowNull: false,
          defaultValue: 0,
        },
        avatar_url: {
          type: STRING(255),
          allowNull: false,
        },
        html_url: {
          type: STRING(255),
          allowNull: false,
        },
        type: {
          type: STRING(20),
          allowNull: false,
        },
        site_admin: {
          type: INTEGER(1),
          allowNull: false,
        },
        company: {
          type: STRING(100),
          allowNull: false,
        },
        blog: {
          type: STRING(255),
          allowNull: false,
        },
        location: {
          type: STRING(200),
          allowNull: false,
        },
        email: {
          type: STRING(100),
          allowNull: false,
        },
        public_repos: {
          type: INTEGER(6),
          allowNull: false,
        },
        public_gists: {
          type: INTEGER(6),
          allowNull: false,
        },
        followers: {
          type: INTEGER(11),
          allowNull: false,
        },
        following: {
          type: INTEGER(11),
          allowNull: false,
        },
        site_created_at: {
          type: DATE,
          allowNull: true,
        },
        site_updated_at: {
          type: DATE,
          allowNull: true,
        },
        created_at: {
          type: DATE,
          allowNull: true,
        },
        updated_at: {
          type: DATE,
          allowNull: true,
        },
        view_number: {
          type: INTEGER(11),
          allowNull: false,
        },
        status: {
          type: INTEGER(1),
          allowNull: false,
        },
        fetched_at: {
          type: DATE,
          allowNull: false,
          defaultValue: '1000-01-01 00:00:00',
        },
        analytics_at: {
          type: DATE,
          allowNull: false,
          defaultValue: '1000-01-01 00:00:00',
        },
        rating: {
          type: 'DOUBLE(8,2)',
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
