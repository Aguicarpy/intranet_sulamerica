// const { RegistroAcceso, Officer } = require('../../db')
// // const detectSucursal = require('../../helpers/detectSucursal'); // Importa el helper para detectar sucursal

// const getRegistrarAcceso = async (name) => {
//   try {
//     // Detectar sucursal automáticamente por IP
//     // const sucursal = await detectSucursal(direccionIp);

//     // Crear el registro de acceso

//     const registro = await RegistroAcceso.findAll({
//       where: filters,
//       include: [
//         { model: Officer, attributes: ['name'], through: {attributes: [] } },
//       ],
//     });

//     const getDataByName = await registro.filter((registro) => registro.name.toLowerCase().includes(name.toLowerCase()))


//     // const registro = await RegistroAcceso.create({
//     //   officerId,
//     //   sucursalId: sucursal.id,
//     //   tipoAcceso,
//     //   direccionIp,
//     //   tipoDispositivo,
//     // });

//     return getDataByName;
//   } catch (error) {
//     throw new Error('Un error ha ocurrido buscando la información.');
//   }
// };

// module.exports = {
//   getRegistrarAcceso,
// };

const { RegistroAcceso, Officer, SucursalIP } = require('../../db');

const getAccessRecords = async () => {
    try {
        const accessRecords = await RegistroAcceso.findAll({
            include: [
                {
                    model: Officer,
                    attributes: ['name'], // Traer solo el nombre del oficial
                },
                {
                    model: SucursalIP,
                    attributes: ['ip_publico'], // Traer solo el IP público
                },
            ],
            attributes: ['tipoAcceso', 'tipoDispositivo', 'fechaHora', 'tiempoOlvidado'], // Traer atributos específicos de RegistroAcceso
        });

        return accessRecords;
    } catch (error) {
        throw new Error('Un error ha ocurrido buscando los registros de acceso.');
    }
};

module.exports = getAccessRecords;
