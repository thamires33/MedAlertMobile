const db = require('./db');

const Medicamento = db.sequelize.define('medicamento', {
    id_medicamento: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.TEXT
    },
    dosagem: {
        type: db.Sequelize.TEXT
    },
    fabricante: {
        type: db.Sequelize.TEXT
    },
    tarja: {
        type: db.Sequelize.TEXT
    }
}, {
    freezeTableName: true
});

//Medicamento.sync({ force: true });

module.exports = Medicamento;
