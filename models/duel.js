'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class duel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  duel.init({
    total: DataTypes.INTEGER,
    won: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'duel',
  });
  return duel;
};