const db = require('./db');

const Paciente = db.sequelize.define('paciente', {
    id_paciente: {
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
    dtNasc: {
        type: db.Sequelize.DATE
    },
    endereco: {
        type: db.Sequelize.TEXT
    },
    contato: {
        type: db.Sequelize.INTEGER
    }
}, { freezeTableName: true });

// Sincronize o modelo Paciente - Comentar imediatamente após criado, senão gerará erros na importacao de outras tabelas que dependem dessa
//Paciente.sync({force: true});
module.exports = Paciente; 