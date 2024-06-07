const db = require('./db'); 
const Receita = require('./Receita');

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
    dtNasc:  { 
        type: db.Sequelize.DATE
    },
    endereco: { 
        type: db.Sequelize.TEXT
    },
    contato:{
        type: db.Sequelize.INTEGER
    }
}, { freezeTableName: true });  

Paciente.sync({force: true}); 

module.exports = Paciente; 
