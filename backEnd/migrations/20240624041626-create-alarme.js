'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alarmes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_usuario: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model:'logins',key:'id'},
        onDelete:'CASCADE'
      },
      nome_medicamento: {
        type: Sequelize.STRING
      },
      posologia: {
        type: Sequelize.STRING
      },
      intervalo_doses: {
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
    await queryInterface.dropTable('Alarmes');
  }
};