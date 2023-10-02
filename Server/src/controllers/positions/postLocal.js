const {Local} = require('../../db')

const postNewLocal = async(local) => {
    try {
        const createNewLocal = await Local.create({ local })
        return createNewLocal
    } catch (error) {
        throw error
    }
}

module.exports = postNewLocal