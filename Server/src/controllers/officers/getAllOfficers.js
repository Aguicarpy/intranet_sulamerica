const {Officer, Position, Local} = require('../../db');

const getAllOfficers = async() => {
    try {
        const getData = await Officer.findAll({
            include: [
                {
                  model: Position,
                  attributes: ['department', 'position'],
                  through: {
                    attributes: [],
                  },
                },
                {
                  model: Local, // Incluye el modelo Local
                  attributes: ['local'], // Puedes seleccionar los atributos que deseas incluir
                  through: {
                    attributes: [],
                  },
                },
              ],
            
        })
        return getData;
    } catch (error) {
        error.message = 'No se pudo acceder a los datos';
        throw error(error.message);
    }
}

module.exports = getAllOfficers;