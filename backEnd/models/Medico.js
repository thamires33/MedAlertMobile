
const db = require('./db');
//const Receita = require('./Receita');
const Medico = db.sequelize.define('medico', {
    id_medico: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.TEXT
    },
    sobrenome: {
        type: db.Sequelize.TEXT
    },
    especialidade: {
        type: db.Sequelize.TEXT
    },
    CRM: {
        type: db.Sequelize.INTEGER
    },
    contato: {
        type: db.Sequelize.INTEGER
    }
}, { freezeTableName: true });
Medico.sync({force: true}); 
module.exports = Medico;


