const Sequelize = require('sequelize');

const sequelize = new Sequelize('medalert', 'root', 'root', {
    host: "localhost",
    port: "3306",
    dialect: 'mysql'
});
 
//Vamos exportar as variáveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}