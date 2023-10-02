const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Local', {
    local: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
  );
};