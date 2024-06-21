const db = require(`./db`);
const Login = require('./Login');

const Alarme = db.sequelize.define('alarme', {
    id_alarme: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fk_usuario: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Login, key: 'id_usuario'
        }
    },
    nome_medicamento: {
        type: db.Sequelize.STRING,

    },
    posologia: {
        type: db.Sequelize.INTEGER,
    },
    intervalo_doses: {
        type: db.Sequelize.INTEGER
    }
}, {
    freezeTableName: true
});

//Alarme.sync({force:true});
module.exports = Alarme;