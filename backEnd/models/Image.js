const { DataTypes } = require('sequelize');
const { sequelize } = require('./db'); // Ajustado para usar 'db.js'

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuario', // Nome da tabela no banco de dados
      key: 'id_usuario'
    },
    allowNull: false
  }
});
//Image.sync({force: true});
module.exports = Image ;
