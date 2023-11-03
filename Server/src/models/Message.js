const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender_name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    sender_image: {
      type:DataTypes.STRING,
      allowNull: false
    }
  },
  );
};