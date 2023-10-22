'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  card.init({
    yellow: DataTypes.INTEGER,
    yellowred: DataTypes.INTEGER,
    red: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'card',
  });
  return card;
};