const { DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Convocation',
    {
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        places: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM('cerrado', 'abierto'),
            defaultValue: 'abierto'
        }
    })
}