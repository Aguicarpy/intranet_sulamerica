const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING, // O el tipo de dato correspondiente
      allowNull: false,
    },
  });
};