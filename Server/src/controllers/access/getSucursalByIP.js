const { SucursalIP } = require('../../db');

const getSucursalByIP = async (req) => {
    try {
        // Obtener IP del cliente
        const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;

        // Validar IP en la base de datos
        const sucursal = await SucursalIP.findOne({ where: { ip_publico: clientIP } });

        if (!sucursal) {
            return { error: 'No se encontró una sucursal asociada a esta IP.' };
        }

        return { sucursal: sucursal.nombre_sucursal };
    } catch (error) {
        console.error(error);
        return { error: 'Error al obtener la sucursal.' };
    }
};

module.exports = getSucursalByIP;
