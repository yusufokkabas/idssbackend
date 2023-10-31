'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('player_statistics_by_seasons', 'substitutes_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'substitutes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('player_statistics_by_seasons', 'substitutes_id');
  }
};
