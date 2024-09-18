// import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from '@env';

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
host: process.env.DB_HOST,
port: process.env.DB_PORT,
dialect: 'mysql'
});

module.exports = {
Sequelize: Sequelize,
sequelize: sequelize
}