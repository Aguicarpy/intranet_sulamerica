// const { RegistroAcceso, Officer, SucursalIP } = require('../../db');
// const { Op } = require('sequelize');
// const moment = require('moment'); // Manejo de tiempo

// const postAccessRecord = async (userId, sucursalIP, tipoAcceso) => {
//     try {
//         const currentTime = new Date();

//         // Buscar sucursal asociada al IP
//         const sucursal = await SucursalIP.findOne({ where: { ip_publico: sucursalIP } });
//         if (!sucursal) {
//             throw new Error('Sucursal no encontrada para el IP proporcionado.');
//         }

//         // Verificar registro activo de entrada
//         const registroActivo = await RegistroAcceso.findOne({
//             where: {
//                 officerId: userId,
//                 tipoAcceso: 'entrada',
//                 sucursalIP: sucursal.id,
//                 fechaHora: {
//                     [Op.gte]: moment().subtract(7, 'days').toDate(), // Últimos 7 días
//                 },
//             },
//             order: [['fechaHora', 'DESC']], // Buscar el registro más reciente
//         });

//         if (tipoAcceso === 'entrada') {
//             // Caso: El usuario marca "Entrada"
//             if (registroActivo && !registroActivo.tiempoOlvidado) {
//                 return { message: 'Ya tienes una entrada activa sin salida. Por favor, marca salida primero.' };
//             }

//             await RegistroAcceso.create({
//                 officerId: userId,
//                 tipoAcceso: 'entrada',
//                 sucursalIP: sucursal.id,
//                 tipoDispositivo: 'Desconocido',
//                 fechaHora: moment(currentTime).hour(7).minute(0).toDate(), // Registrar entrada desde las 07:00
//             });

//             return { message: `Entrada registrada a las 07:00 en la sucursal ${sucursal.nombre}.` };
//         }

//         if (tipoAcceso === 'salida') {
//             // Caso: El usuario marca "Salida"
//             if (!registroActivo) {
//                 return { message: 'No tienes una entrada activa para marcar salida.' };
//             }

//             const entradaHora = moment(registroActivo.fechaHora);
//             const salidaHora = moment(currentTime);
//             const duracion = salidaHora.diff(entradaHora, 'hours', true); // Diferencia en horas (con decimales)

//             let mensajeAdicional = '';

//             if (duracion > 24) {
//                 const tiempoAcumulado = moment.utc(salidaHora.diff(entradaHora)).format('HH:mm:ss');
//                 mensajeAdicional = `El usuario ha olvidado marcar salida y estuvo ${tiempoAcumulado} en entrada.`;

//                 await RegistroAcceso.update(
//                     { tiempoOlvidado: tiempoAcumulado },
//                     { where: { id: registroActivo.id } }
//                 );
//             }

//             await RegistroAcceso.create({
//                 officerId: userId,
//                 tipoAcceso: 'salida',
//                 sucursalIP: sucursal.id,
//                 tipoDispositivo: 'Desconocido',
//                 fechaHora: currentTime,
//             });

//             return {
//                 message: `Salida registrada en la sucursal ${sucursal.nombre}. ${mensajeAdicional}`,
//             };
//         }

//         return { message: 'Tipo de acceso inválido.' };
//     } catch (error) {
//         console.error(error);
//         return { error: error.message || 'Error al registrar acceso.' };
//     }
// };

// module.exports = postAccessRecord;

const { RegistroAcceso, SucursalIP, Officer } = require('../../db');
const { Op } = require('sequelize');
const moment = require('moment');
const detectSucursal = require('../../helpers/detectSucursal'); // Asegúrate de que este helper esté correctamente configurado

const postAccessRecord = async (ip_publico, tipoAcceso, officerId) => {
    try {
        // Verificar si officerId es válido
        if (!officerId) {
            return { message: "El officerId no está definido o es inválido." };
        }

        // Detectar sucursal asociada al IP público
        const sucursal = await detectSucursal(ip_publico);
        if (!sucursal) {
            return { error: 'No se encontró una sucursal asociada a esta IP.' };
        }

        // Verificar si el officerId existe en la base de datos
        const officer = await Officer.findOne({
            where: {
                id: officerId,
            },
        });

        if (!officer) {
            return { message: "El officerId no existe en la base de datos." };
        }

        const currentTime = new Date();

        // Buscar si ya hay un registro activo de entrada para este officerId en los últimos 7 días
        const registroActivo = await RegistroAcceso.findOne({
            where: {
                officerId: officerId,
                tipoAcceso: 'entrada',
                sucursalIP: sucursal.id,
                fechaHora: { [Op.gte]: moment().subtract(7, 'days').toDate() },
            },
            order: [['fechaHora', 'DESC']],
        });

        if (tipoAcceso === 'entrada') {
            if (registroActivo && !registroActivo.tiempoOlvidado) {
                return { message: 'Ya tienes una entrada activa sin salida. Por favor, marca salida primero.' };
            }

            // Crear un registro de entrada
            await RegistroAcceso.create({
                officerId,
                tipoAcceso: 'entrada',
                sucursalIP: sucursal.id,
                tipoDispositivo: 'Desconocido',
                fechaHora: currentTime,
            });

            return { message: `Entrada registrada en la sucursal ${sucursal.nombre}.` };
        }

        if (tipoAcceso === 'salida') {
            if (!registroActivo) {
                return { message: 'No tienes una entrada activa para marcar salida.' };
            }

            const entradaHora = moment(registroActivo.fechaHora);
            const salidaHora = moment(currentTime);
            const duracion = salidaHora.diff(entradaHora, 'hours', true);

            let mensajeAdicional = '';

            if (duracion > 24) {
                const tiempoAcumulado = moment.utc(salidaHora.diff(entradaHora)).format('HH:mm:ss');
                mensajeAdicional = `El usuario ha olvidado marcar salida y estuvo ${tiempoAcumulado} en entrada.`;

                await RegistroAcceso.update(
                    { tiempoOlvidado: tiempoAcumulado },
                    { where: { id: registroActivo.id } }
                );
            }

            // Crear un registro de salida
            await RegistroAcceso.create({
                officerId,
                tipoAcceso: 'salida',
                sucursalIP: sucursal.id,
                tipoDispositivo: 'Desconocido',
                fechaHora: currentTime,
            });

            return {
                message: `Salida registrada en la sucursal ${sucursal.nombre}. ${mensajeAdicional}`,
            };
        }

        return { error: 'Tipo de acceso inválido.' };
    } catch (error) {
        console.error('Error en postAccessRecord:', error);
        return { error: error.message || 'Error al registrar acceso.' };
    }
};

module.exports = postAccessRecord;

