const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('SucursalIP', {
        id: {
            type: DataTypes.INTEGER,
            // defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre_sucursal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ip_publico: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        direccion: {
            type: DataTypes.STRING, // Dirección física de la sucursal
            allowNull: true, // Puede ser opcional
        },
        descripcion: {
            type: DataTypes.TEXT, // Información adicional de la sucursal
            allowNull: true,
        },
    }, {
        timestamps: false,
    });
};

