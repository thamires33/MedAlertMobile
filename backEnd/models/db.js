const Sequelize = require('sequelize');
//DB connection

const sequelize = new Sequelize('medalert', '2NisoRYBnfynmEV.root', 'HDkCsJufa3GhZCIW', {
host: "gateway01.us-east-1.prod.aws.tidbcloud.com",
port: "4000",
dialect: 'mysql'
});

module.exports = {
Sequelize: Sequelize,
sequelize: sequelize

}