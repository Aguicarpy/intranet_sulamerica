const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Chat', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isGeneral: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
  },
  { timestamps: false }
  );
};