const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  );
};