'use strict';
const { Model } = require('sequelize');

<<<<<<< HEAD
module.exports = (sequelize, DataTypes) => {
  class Alarme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
=======

const Alarme = db.sequelize.define('alarme',{
    id_alarme: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    medicamento:{
        type:db.Sequelize.STRING,

    },
    dosagem:{
        type:db.Sequelize.STRING,
    },
    frequencia:{
        type:db.Sequelize.STRING,
    },
    unidade:{
        type:db.Sequelize.STRING,

>>>>>>> calendario
    }
  }
  Alarme.init({
    // fk_usuario: DataTypes.INTEGER,
    nome_medicamento: DataTypes.STRING,
    posologia: DataTypes.STRING,
    intervalo_doses: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Alarme',
    tableName: 'alarmes' // Adicione o nome da tabela se necessário
  });
  return Alarme;
};
