'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('teams', {
      fields: ['team_id'],
      type: 'foreign key',
      name: 'fk_team_id',
      references: {
        table: 'general_team_infos',
        field: 'id'
      },
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('teams', 'fk_team_id');
  }
};
