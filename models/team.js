'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      team.belongsTo(models.general_team_info, {
        foreignKey: 'team_id',
        as: 'generalTeamInfo',
      });
    }
  }
  team.init({
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'general_team_infos',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'team',
  });
  return team;
};