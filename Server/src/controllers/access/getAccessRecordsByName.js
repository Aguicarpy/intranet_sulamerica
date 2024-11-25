const { RegistroAcceso, Officer, SucursalIP } = require('../../db');
const { Op } = require('sequelize');

const getAccessRecordsByName = async (name) => {
    try {
        const accessRecords = await RegistroAcceso.findAll({
            include: [
                {
                    model: Officer,
                    attributes: ['name'], // Traer solo el nombre del oficial
                    where: {
                        name: {
                            [Op.iLike]: `%${name}%`, // Insensible a mayúsculas y busca coincidencias parciales
                        },
                    },
                },
                {
                    model: SucursalIP,
                    attributes: ['ip_publico'], // Traer solo el IP público
                },
            ],
            attributes: ['tipoAcceso', 'tipoDispositivo', 'fechaHora', 'tiempoOlvidado'], // Atributos específicos de RegistroAcceso
        });

        if (accessRecords.length === 0) {
            return { message: 'Funcionario no encontrado' }; // Mensaje si no hay registros
        }

        return accessRecords;
    } catch (error) {
        throw new Error('Un error ha ocurrido buscando los registros por nombre.');
    }
};

module.exports = getAccessRecordsByName;

