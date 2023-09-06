const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Anniversary',
    {
        birthDay: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        congratulations: {
            type: DataTypes.BOOLEAN,
        },
    },
    { timestamps: false}
    )
}