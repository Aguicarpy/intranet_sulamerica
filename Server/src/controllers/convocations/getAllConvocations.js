const { Convocation } = require('../../db')

const getAllConvocations = async() =>{
    const allConvocations = await Convocation.findAll()
    return allConvocations
}

module.exports = getAllConvocations;