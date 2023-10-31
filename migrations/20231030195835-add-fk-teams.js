'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('teams', 'team_id', {
      type: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('teams', 'team_id');
  }
};
