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
    }
  });
};