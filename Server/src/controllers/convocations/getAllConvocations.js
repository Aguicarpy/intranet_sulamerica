const { Convocation, Position, Local } = require('../../db')

const getAllConvocations = async() =>{
    try {
        const allConvocations = await Convocation.findAll({
            include: [{
                model: Position,
                as: 'position',
                attributes: ['department','position','salary','shedule']
            },
            {
                model: Local,
                as: 'local',
                attributes: ['local']
            }]
        })
        return allConvocations
    } catch (error) {
        throw new Error('Un error ha ocurrido buscando la información.');
    }
}

module.exports = getAllConvocations;