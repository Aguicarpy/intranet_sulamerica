const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Officer', {
    id:{
        type: DataTypes.UUID,   //Garantiza unicidad de id
        defaultValue: DataTypes.UUIDV4,   //uuid aleatorio pra registro na tabela
        primaryKey: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDay: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    congratulations: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    phone:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  { timestamps: false }
);
};