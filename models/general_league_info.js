'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class general_league_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  general_league_info.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    logo: DataTypes.STRING,
    country: DataTypes.STRING,
    country_code: DataTypes.STRING,
    country_flag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'general_league_info',
  });
  return general_league_info;
};
