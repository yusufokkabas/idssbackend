'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('general_team_infos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      league_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'general_league_infos',
          key: 'id'
        }
      },
      name: Sequelize.STRING,
      code: Sequelize.STRING,
      country: Sequelize.STRING,
      founded: Sequelize.STRING,
      logo: Sequelize.STRING,
      national: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('general_team_infos');
  }
};