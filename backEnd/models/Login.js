const Sequelize = require('sequelize');
const db = require('./db');

const Login = db.sequelize.define('usuario', {
    id_usuario: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    profileImage: {
        type: db.Sequelize.STRING, // Tipo de dado para armazenar a URL ou caminho da imagem
        allowNull: true // Permite valores nulos se a imagem não for fornecida
    }
}, { freezeTableName: true });

// Synchronize with the database, use { force: true } only if you want to drop and recreate the table
//Login.sync({ force: true });

module.exports = Login;
