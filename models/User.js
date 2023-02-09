const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// Model for User
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
 User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    }, 
  },
  
  // before a Pass made or modified, hash the password
  {
    hooks: {
      beforeCreate: async (dataBrandnewUser) => {
        dataBrandnewUser.password = await bcrypt.hash(dataBrandnewUser.password, 10);
        return dataBrandnewUser;
      },
      beforeUpdate: async (updateDataUser) => {
        updateDataUser.password = await bcrypt.hash(updateDataUser.password, 10);
        return updateDataUser;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;