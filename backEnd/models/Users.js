const db = require('./db');

const Users = db.sequelize.define('Users', { 
    id_Users: {  
        type: db.Sequelize.INTEGER,  
        autoIncrement: true,  
        allowNull: false,  
        primaryKey: true  
    },  
    login: {  
        type: db.Sequelize.TEXT  
    }, 
    senha:{
        type: db.Sequelize.STRING
    }
    
}, { freezeTableName: true });  

// Sincronize o modelo Users
//Users.sync({ force: true });

module.exports = Users; 
