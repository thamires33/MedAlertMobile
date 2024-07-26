// models/Image.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Image = sequelize.define('Image', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Image;
