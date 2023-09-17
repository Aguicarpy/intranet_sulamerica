const { Convocation, Position } = require('../../db')

const postNewConvocation = async(title, places, state, position) =>{
    try {
        const findPosition = await Position.findOne({ where: { position }})
    
        const createNewConvocation = await Convocation.create({title, places, state, position_id: findPosition.id})
        return createNewConvocation;
    } catch (error) {
        throw new Error('Un error ha ocurrido al postear la convocatoria.');
    }
}

module.exports = postNewConvocation;