'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('penalties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      won: {
        type: Sequelize.INTEGER
      },
      committed: {
        type: Sequelize.INTEGER
      },
      scored: {
        type: Sequelize.INTEGER
      },
      missed: {
        type: Sequelize.INTEGER
      },
      saved: {
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
    await queryInterface.dropTable('penalties');
  }
};