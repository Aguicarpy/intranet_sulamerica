const { Convocation } = require('../../db')

const postNewConvocation = async(title, places, state) =>{
    const createNewConvocation = await Convocation.create({title, places, state})
    return createNewConvocation;
}

module.exports = postNewConvocation;