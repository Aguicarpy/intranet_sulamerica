const { DataTypes } = require('sequelize');
const { hashPassword, comparePassword} = require('../helpers/passwordHashed')

module.exports = (sequelize) => {
  const Officer = sequelize.define('Officer', {
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
    typeUser:{
      type: DataTypes.ENUM('admin', 'rrhh', 'officer'),
      allowNull: false
    },
    phone:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
      type: DataTypes.STRING, 
      allowNull: false,
    }
  },
  { timestamps: false }
);

Officer.beforeCreate(async function(user) {  // Antes de guardar un nuevo registro o actualizar la contraseña, hasheamos la contraseña
    	if (user.changed('password')) {
      		user.password = await hashPassword(user.password);
    	}
  	});
  	Officer.beforeUpdate(async function(user) { 
    	if (user.changed('password')) {
      		user.password = await hashPassword(user.password);
    	}
  	});
  	Officer.prototype.verifyPassword = async function(password) {  // Método para verificar la contraseña
    	return await comparePassword(password, this.password);
  	};
  	return Officer; 
};