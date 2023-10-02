const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  sequelize.define('Position', {
    id:{
      type: DataTypes.UUID,   //Garantiza unicidad de id
      defaultValue: DataTypes.UUIDV4,   //uuid aleatorio pra registro na tabela
      primaryKey: true,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    position:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate:{
        min: 0
      }
    },
    shedule:{
      type: DataTypes.TIME,
      allowNull: false,
    }
  },
  { timestamps: false }
);
};