const {Position} = require('../../db')

const normalizeText = (text) => {
    return unorm.nfc(text)
}
const postNewPosition = async(department, position, local, salary, shedule) => {
    const createNewPosition = await Position.create({ department, position, local, salary, shedule })
    return createNewPosition
}

module.exports = postNewPosition