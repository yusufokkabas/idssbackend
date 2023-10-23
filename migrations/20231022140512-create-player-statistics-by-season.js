'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('player_statistics_by_seasons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shots_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shots',
          key: 'id'
        }
      },
      goals_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'goals',
          key: 'id'
        }
      },
      passes_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'passes',
          key: 'id'
        }
      },
      tackles_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tackles',
          key: 'id'
        }
      },
      duels_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'duels',
          key: 'id'
        }
      },
      dribbles_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'dribbles',
          key: 'id'
        }
      },
      fouls_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'fouls',
          key: 'id'
        }
      },
      cards_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cards',
          key: 'id'
        }
      },
      penalties_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'penalties',
          key: 'id'
        }
      },
      game_infos_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'game-infos',
          key: 'id'
        }
      },
      teams_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('player_statistics_by_seasons');
  }
};