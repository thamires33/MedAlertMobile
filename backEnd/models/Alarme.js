'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alarme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Alarme.init({
    fk_usuario: DataTypes.INTEGER,
    nome_medicamento: DataTypes.STRING,
    posologia: DataTypes.STRING,
    intervalo_doses: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Alarme',
  });
  return Alarme;
};