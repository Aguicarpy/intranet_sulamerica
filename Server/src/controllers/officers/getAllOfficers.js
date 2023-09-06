const {Officer, Position} = require('../../db');

const getAllOfficers = async() => {
    try {
        const getData = await Officer.findAll({
            include: {
                model: Position,
                attributes: ['department','position','local'],
                through:{
                    attributes: []
                }
            }
        })
        return getData;
    } catch (error) {
        error.message = 'No se pudo acceder a los datos';
        throw error(error.message);
    }
}

module.exports = getAllOfficers;