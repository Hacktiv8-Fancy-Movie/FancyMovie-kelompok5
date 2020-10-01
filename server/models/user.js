'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email:{
      type:DataTypes.STRING,
      unique:true,
      validate:{
        isEmail:{
          msg: "input is not valid email"
        },
        notEmpty:{
          msg: "email is required"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      notEmpty:{
        msg: "password is required"
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })
  return User;
};