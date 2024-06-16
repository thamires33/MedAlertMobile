
const db = require('./db');
const Medico = require('./Medico');
const Paciente = require('./Paciente');

const Receita = db.sequelize.define('receita', {
    id_receita: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fk_medico: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Medico,
            key: 'id_medico'
        }
    },
    fk_paciente: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Paciente,
            key: 'id_paciente'
        }
    },
    datePrescricao: {
        type: db.Sequelize.DATE
    },
    diagnostico: {
        type: db.Sequelize.TEXT
    },
    observacoes: {
        type: db.Sequelize.TEXT
    }
}, {
    freezeTableName: true
});

//Receita.sync();

module.exports = Receita;
