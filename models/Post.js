const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Model for Post
class Post extends Model {}

  Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    titlePost: {
      type: DataTypes.STRING(25),
      unique: true,
      allowNull: false,
    },
    postContent: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    thedate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;