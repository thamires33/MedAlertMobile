const db = require('./db');
const Login = require('./Login');

const Alarme = db.sequelize.define('alarme', {
    id_alarme: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    medicamento: {
        type: db.Sequelize.STRING,
    },
    dosagem: {
        type: db.Sequelize.STRING,
    },
    frequencia: {
        type: db.Sequelize.STRING,
    },
    unidade: {
        type: db.Sequelize.STRING,
    },
    imageUri: { 
        type: db.Sequelize.TEXT,
    }
}, {
    freezeTableName: true
});

//Alarme.sync({force:true});
module.exports = Alarme;