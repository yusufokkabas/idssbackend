'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penalty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  penalty.init({
    won: DataTypes.INTEGER,
    committed: DataTypes.INTEGER,
    scored: DataTypes.INTEGER,
    missed: DataTypes.INTEGER,
    saved: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'penalty',
  });
  return penalty;
};