const Sequelize = require('sequelize');
const db = require('../config/database');

const Image = db.define('image', {
  filename: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Image;
