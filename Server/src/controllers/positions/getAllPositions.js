const { Position } = require('../../db')

const getAllPositions = async() => {
    try {
        const getDataPositions = await Position.findAll()
        return getDataPositions
    } catch (error) {
        error.message = 'Error al acceder a la data'
        throw error(error.message)
    }
}

module.exports = getAllPositions;