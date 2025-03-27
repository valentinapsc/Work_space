'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Metodo di supporto per definire le associazioni.
     * Questo metodo non fa parte del ciclo di vita di Sequelize.
     * Il file `models/index` chiamerà questo metodo automaticamente.
     */
    static associate(models) {
      // definire le associazione
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};