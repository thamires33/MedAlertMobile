'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alarme', {
      id_alarme: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      medicamento: {
        type: Sequelize.STRING,
        allowNull: true, // Defina se o campo pode ser nulo ou não
      },
      dosagem: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      frequencia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imageUri: { 
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alarme');
  },
};
