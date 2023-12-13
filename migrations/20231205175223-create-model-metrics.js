'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('model_metrics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      model_name: {
        type: Sequelize.STRING
      },
      n_fold_score: {
        type: Sequelize.STRING
      },
      mean_squarred_error: {
        type: Sequelize.STRING
      },
      r_squared: {
        type: Sequelize.STRING
      },
      precision: {
        type: Sequelize.STRING
      },
      recall: {
        type: Sequelize.STRING
      },
      f1_score: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('model_metrics');
  }
};