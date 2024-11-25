/*const { SucursalIP, Local} = require('../db')

const detectSucursal = async (ip_publico) => {
  // Busca el registro en SucursalIP que coincida con el IP público
  const sucursalIP = await SucursalIP.findOne({
    where: { ip_publico: ip_publico },
    include: [{ model: Local }], // Incluye la información de la sucursal (Local)
  });

  if (!sucursalIP) {
    throw new Error('No se encontró ninguna sucursal para este IP');
  }

  return sucursalIP.Local; // Retorna la sucursal asociada
};

module.exports = detectSucursal;*/




// const { SucursalIP, Local } = require('../db'); // Importar los modelos necesarios

/**
 * Detecta la sucursal asociada a una dirección IP.
 * @param {string} ip - Dirección IP pública a buscar.
 * @returns {Promise<Object>} - Objeto de la sucursal asociada, si se encuentra.
 * @throws {Error} - Si no se encuentra una sucursal asociada a la IP.
 */
// const detectSucursal = async (ip) => {
//     try {
//         // Busca el registro en SucursalIP que coincida con la dirección IP proporcionada
//         const sucursalIP = await SucursalIP.findOne({
//             where: { ip_publico: ip },
//             include: [{ model: Local }], // Incluye la información de la sucursal asociada
//         });

//         // Si no se encuentra un registro para la IP
//         if (!sucursalIP) {
//             throw new Error('No se encontró ninguna sucursal para este IP.');
//         }

//         return sucursalIP.Local; // Retorna el modelo Local asociado (la sucursal)
//     } catch (error) {
//         console.error(`Error detectando sucursal para la IP ${ip}:`, error.message);
//         throw error; // Lanza el error para que el controlador lo maneje
//     }
// };

// module.exports = detectSucursal;

const { SucursalIP, Local } = require('../db');
const detectSucursal = async (ip) => {
  try {
      // Verificar si la IP es local (localhost)
      if (ip === '127.0.0.1' || ip === '::1') {
          console.log('IP local detectada. No se buscará sucursal.');
          return { nombre: 'Sucursal Local' }; // O una respuesta predeterminada para pruebas
      }

      // Buscar sucursal asociada a la IP
      const sucursalIP = await SucursalIP.findOne({
          where: { ip_publico: ip },
          include: [{ model: Local }],
      });

      if (!sucursalIP) {
          throw new Error('No se encontró ninguna sucursal para este IP.');
      }

      return sucursalIP.Local; // Retorna la sucursal asociada
  } catch (error) {
      console.error(`Error detectando sucursal para la IP ${ip}:`, error.message);
      throw error;
  }
};


module.exports = detectSucursal;

