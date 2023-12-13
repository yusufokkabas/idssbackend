'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class model_metrics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  model_metrics.init({
    model_name: DataTypes.STRING,
    n_fold_score: DataTypes.STRING,
    mean_squarred_error: DataTypes.STRING,
    r_squared: DataTypes.STRING,
    precision: DataTypes.STRING,
    recall: DataTypes.STRING,
    f1_score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'model_metrics',
  });
  return model_metrics;
};