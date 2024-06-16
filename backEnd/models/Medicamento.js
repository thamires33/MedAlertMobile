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
        type: db.Sequelize.STRING(10),allowNull:false
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
// Sincronize o modelo Medicamento - Comentar imediatamente após criado, senão gerará erros na importacao de outras tabelas que dependem dessa
//Medicamento.sync({ force: true });
module.exports = Medicamento;