'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apps: {
        type: Sequelize.INTEGER
      },
      lineups: {
        type: Sequelize.INTEGER
      },
      minutes: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      captain: {
        type: Sequelize.BOOLEAN
      },
      subbed_in: {
        type: Sequelize.INTEGER
      },
      subbed_out: {
        type: Sequelize.INTEGER
      },
      bench: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('game_infos');
  }
};