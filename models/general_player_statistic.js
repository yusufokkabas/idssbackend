'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class general_player_statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      general_player_statistic.belongsTo(models.player_statistics_by_season, {
        foreignKey: 'statistics_id',
        as: 'statistics',
      });
    }
  }
  general_player_statistic.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    season: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    nationality: DataTypes.STRING,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    injured: DataTypes.BOOLEAN,
    photo: DataTypes.STRING,
    market_value_in_eur: DataTypes.STRING,
    market_value_date: DataTypes.STRING,
    statistics_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'player_statistics_by_seasons',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'general_player_statistic',
  });
  return general_player_statistic;
};