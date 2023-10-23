'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class general_team_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  general_team_info.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    league_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'general_league_infos',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    country: DataTypes.STRING,
    founded: DataTypes.STRING,
    logo: DataTypes.STRING,
    national: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'general_team_info',
  });
  return general_team_info;
};