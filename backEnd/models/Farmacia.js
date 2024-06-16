const db = require('./db');
const Farmacia = db.sequelize.define('farmacia', {
    id_farmacia: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.TEXT
    },
    endereco: {
        type: db.Sequelize.TEXT
    },
    contato: {
        type: db.Sequelize.INTEGER
    }
}, { freezeTableName: true });
//Farmacia.sync({force: true}); 
module.exports = Farmacia; 