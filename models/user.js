'use strict';
const {
  Model
} = require('sequelize');
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
  }
  User.init({
    id: {
      type:DataTypes.INTEGER, 
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type:DataTypes.STRING,
      allowNull: false
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type:DataTypes.STRING,
      allowNull: false
    },
    birth_date: {
      type:DataTypes.STRING,
      allowNull: true
    },
    photo: {
      type:DataTypes.STRING,
      allowNull: true
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type:DataTypes.STRING,
      allowNull: true
    },
    setting: {
      type:DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};