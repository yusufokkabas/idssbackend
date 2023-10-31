'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dribble extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dribble.init({
    attempts: DataTypes.INTEGER,
    success: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dribble',
  });
  return dribble;
};