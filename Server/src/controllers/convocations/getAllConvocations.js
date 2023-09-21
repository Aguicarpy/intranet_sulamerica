const { Convocation, Position } = require('../../db')

const getAllConvocations = async() =>{
    try {
        const allConvocations = await Convocation.findAll({
            include: {
                model: Position,
                as: 'position',
                attributes: ['department','position','local','salary','shedule']
            }
        })
        return allConvocations
    } catch (error) {
        throw new Error('Un error ha ocurrido buscando la información.');
    }
}

module.exports = getAllConvocations;