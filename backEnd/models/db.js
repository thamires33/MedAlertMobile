const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true, // Para conexões seguras com o Azure
        trustServerCertificate: true, // Ajuste conforme necessário
      },
    },
  });

module.exports = {
Sequelize: Sequelize,
sequelize: sequelize
}