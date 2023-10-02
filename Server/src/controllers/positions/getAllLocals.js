
const { Local } = require('../../db')

const getAllLocals = async() => {
    try {
        const getDataLocal = await Local.findAll()
        return getDataLocal
    } catch (error) {
        error.message = 'Error al acceder a la data'
        throw error(error.message)
    }
}

module.exports = getAllLocals;