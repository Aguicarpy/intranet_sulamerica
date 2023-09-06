const { DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Vacation',
    {
        workUnit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start:{
            type: DataTypes.DATE,
            allowNull:false,
        },
        end:{
            type: DataTypes.DATE,
            allowNull:false,
        },
        //Reemplazante
    })
}