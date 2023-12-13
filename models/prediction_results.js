'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prediction_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  prediction_results.init({
    name: DataTypes.STRING,
    market_value_in_eur: DataTypes.INTEGER,
    model_prediction: DataTypes.INTEGER,
    prediction_date: DataTypes.DATE,
    prediction_model: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'prediction_results',
  });
  return prediction_results;
};