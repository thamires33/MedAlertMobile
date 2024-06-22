const Sequelize = require('sequelize');
const path = require("path");
const fs = require('fs');
const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0 &&
            file.indexOf("db.js") !== 0 &&
            file !== basename)
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  })

module.exports = db;