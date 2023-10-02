const { Convocation, Position, Local } = require('../../db')

const postNewConvocation = async(title, places, state, position, local) =>{
    try {
        const findPosition = await Position.findOne({ where: { position }})
        const findLocal = await Local.findOne({ where : { local }})
    
        const createNewConvocation = await Convocation.create({title, places, state, position_id: findPosition.id, local_id: findLocal.id})
        return createNewConvocation;
    } catch (error) {
        throw new Error('Un error ha ocurrido al postear la convocatoria.');
    }
}

module.exports = postNewConvocation;