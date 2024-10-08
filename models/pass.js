'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pass.init({
    total: DataTypes.INTEGER,
    key: DataTypes.INTEGER,
    accuracy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pass',
  });
  return pass;
};