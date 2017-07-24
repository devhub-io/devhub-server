module.exports = function (sequelize, DataTypes) {
  const Repo = sequelize.define('Repo', {
    title: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    language: DataTypes.STRING,
    readme: DataTypes.STRING,
    homepage: DataTypes.STRING,
    github: DataTypes.STRING,
    stargazers_count: DataTypes.INTEGER,
    watchers_count: DataTypes.INTEGER,
    open_issues_count: DataTypes.INTEGER,
    forks_count: DataTypes.INTEGER,
    subscribers_count: DataTypes.INTEGER,
    issue_response: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
    fetched_at: DataTypes.DATE,
    repos_created_at: DataTypes.DATE,
    repos_updated_at: DataTypes.DATE,
    analytics_at: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    is_recommend: DataTypes.BOOLEAN,
    view_number: DataTypes.INTEGER,
    trends: DataTypes.STRING,
    owner: DataTypes.STRING,
    repo: DataTypes.STRING,
    cover: DataTypes.STRING,
    have_questions: DataTypes.BOOLEAN,
    document_url: DataTypes.STRING
  }, {
    tableName: 'repos',
    classMethods: {
      associate (models) {
        // associations can be defined here
      }
    }
  })
  return Repo
}
