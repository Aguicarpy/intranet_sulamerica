const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('RegistroAcceso', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    tipoAcceso: {
      type: DataTypes.ENUM('entrada', 'salida'), // Tipo de acceso
      allowNull: false,
    },
    tipoDispositivo: {
      type: DataTypes.STRING, // Ejemplo: 'Mobile', 'PC'
      allowNull: false,
    },
    fechaHora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    tiempoOlvidado: {
      type: DataTypes.STRING, // Tiempo acumulado en formato "hh:mm:ss"
      allowNull: true,
  },
  });
};