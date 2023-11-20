'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('general_player_statistics', 'market_value_in_eur', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('general_player_statistics', 'market_value_date', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('general_player_statistics', 'market_value_in_eur');
    await queryInterface.removeColumn('general_player_statistics', 'market_value_date')
  }
};
