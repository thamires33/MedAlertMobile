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
    }
}, { freezeTableName: true });

//Login.sync({force: true});

module.exports = Login;
