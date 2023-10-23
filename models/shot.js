'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shot.init({
    total: DataTypes.INTEGER,
    on_target: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shot',
  });
  return shot;
};