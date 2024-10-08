'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  game_info.init({
    appearences: DataTypes.INTEGER,
    lineups: DataTypes.INTEGER,
    minutes: DataTypes.INTEGER,
    position: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    captain: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'game_info',
  });
  return game_info;
};