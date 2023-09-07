const getAllOfficers = require('./getAllOfficers')

const getOfficerById = async(id) => {
    try {
        const dataId = await getAllOfficers(id)
        if(id){
            const idOfficer = dataId.find((officer) => officer.id === id)
            return idOfficer
        }
    } catch (error) {
        throw error('id no relacionado')
    }
}

module.exports = getOfficerById;