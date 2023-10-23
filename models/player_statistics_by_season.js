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
      // define association here
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
    }
  }, {
    sequelize,
    modelName: 'player_statistics_by_season',
  });
  return player_statistics_by_season;
};