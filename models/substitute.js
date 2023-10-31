'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class substitute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  substitute.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    in: DataTypes.INTEGER,
    out: DataTypes.INTEGER,
    bench: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'substitute',
  });
  return substitute;
};