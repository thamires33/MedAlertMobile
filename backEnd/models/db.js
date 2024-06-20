// const Sequelize = require('sequelize');
// // const fs = require('fs');

// // Leitura do certificado
// // const caCert = fs.readFileSync('certificates/cert.pem');

// // Conexão com o banco de dados
// const sequelize = new Sequelize('medalert', 'admedalert', '.Medalert1', {
//   host: "medalert.cf4aimm68wuq.us-east-1.rds.amazonaws.com",
//   port: "3306",
//   dialect: 'mysql',
//   // dialectOptions: {
//   //   ssl: {
//   //     ca: caCert
//   //   }
//   // }
// });

// module.exports = {
//   Sequelize: Sequelize,
//   sequelize: sequelize
// }
const Sequelize = require('sequelize');
//Conexão com o banco de dados

const sequelize = new Sequelize('medalert', 'admedalert', '.Medalert1', {
host: "medalert.cf4aimm68wuq.us-east-1.rds.amazonaws.com",
port: "3306",
dialect: 'mysql'
});
//Vamos exportar as variáveis
module.exports = {
Sequelize: Sequelize,
sequelize: sequelize

}