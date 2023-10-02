const { Position, Local } = require('../../db')

const getAllPositions = async() => {
    try {
        const getDataPositions = await Position.findAll({
            include:{
                model: Local,
                attributes: ["local"],
                through:{
                    attributes: []
                }
            }
        })
        return getDataPositions
    } catch (error) {
        error.message = 'Error al acceder a la data'
        throw error(error.message)
    }
}

module.exports = getAllPositions;