'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player_statistics_by_season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      player_statistics_by_season.belongsTo(models.shot, {
        foreignKey: 'shots_id',
        as: 'shots',
      });
      player_statistics_by_season.belongsTo(models.goal, {
        foreignKey: 'goals_id',
        as: 'goals',
      });
      player_statistics_by_season.belongsTo(models.pass, {
        foreignKey: 'passes_id',
        as: 'passes',
      });
      player_statistics_by_season.belongsTo(models.tackle, {
        foreignKey: 'tackles_id',
        as: 'tackles',
      });
      player_statistics_by_season.belongsTo(models.duel, {
        foreignKey: 'duels_id',
        as: 'duels',
      });
      player_statistics_by_season.belongsTo(models.dribble, {
        foreignKey: 'dribbles_id',
        as: 'dribbles',
      });
      player_statistics_by_season.belongsTo(models.foul, {
        foreignKey: 'fouls_id',
        as: 'fouls',
      });
      player_statistics_by_season.belongsTo(models.card, {
        foreignKey: 'cards_id',
        as: 'cards',
      });
      player_statistics_by_season.belongsTo(models.penalty, {
        foreignKey: 'penalties_id',
        as: 'penalties',
      });
      player_statistics_by_season.belongsTo(models.game_info, {
        foreignKey: 'game_infos_id',
        as: 'game_infos',
      });
      player_statistics_by_season.belongsTo(models.team, {
        foreignKey: 'teams_id',
        as: 'teams',
      });
      player_statistics_by_season.belongsTo(models.substitute, {
        foreignKey: 'substitutes_id',
        as: 'substitutes',
      });
    }
  }
  player_statistics_by_season.init({
    shots_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'shots',
        key: 'id'
      }
    },
    goals_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'goals',
        key: 'id'
      }
    },
    passes_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'passes',
        key: 'id'
      }
    },
    tackles_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'tackles',
        key: 'id'
      }
    }, 
    duels_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'duels',
        key: 'id'
      }
    },
    dribbles_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'dribbles',
        key: 'id'
      }
    },
    fouls_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'fouls',
        key: 'id'
      }
    },
    cards_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'cards',
        key: 'id'
      }
    },
    penalties_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'penalties',
        key: 'id'
      }
    },
    game_infos_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'game_infos',
        key: 'id'
      }
    },

    teams_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'teams',
        key: 'id'
      }
    },
    substitutes_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'substitutes',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'player_statistics_by_season',
  });
  return player_statistics_by_season;
};