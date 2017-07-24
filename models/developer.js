module.exports = function (sequelize, DataTypes) {
  const Developer = sequelize.define('Developer', {
    login: DataTypes.STRING,
    name: DataTypes.STRING,
    github_id: DataTypes.INTEGER,
    avatar_url: DataTypes.STRING,
    html_url: DataTypes.STRING,
    type: DataTypes.STRING,
    site_admin: DataTypes.INTEGER,
    company: DataTypes.STRING,
    blog: DataTypes.STRING,
    location: DataTypes.STRING,
    email: DataTypes.STRING,
    public_repos: DataTypes.INTEGER,
    public_gists: DataTypes.INTEGER,
    followers: DataTypes.INTEGER,
    following: DataTypes.INTEGER,
    view_number: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
    site_created_at: DataTypes.DATE,
    site_updated_at: DataTypes.DATE,
    fetched_at: DataTypes.DATE,
    analytics_at: DataTypes.DATE,
  }, {
    tableName: 'developer',
    classMethods: {
      associate (models) {
        // associations can be defined here
      }
    }
  })
  return Developer
}
