const db = require(`./db`);
const Medicamento = require('./Medicamento');

const Alarme = db.sequelize.define('alarme',{
    id_alarme: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fk_medicamento:{
        type:db.Sequelize.INTEGER,
        allowNull:false,
        references:{
            model: Medicamento,key: 'id_medicamento'
        }
    },
    posologia:{
        type:db.Sequelize.INTEGER,
    },
    intervalo_doses:{
        type:db.Sequelize.INTEGER
    }
},{
    freezeTableName:true
});

//Alarme.sync({force:true});
module.exports=Alarme;