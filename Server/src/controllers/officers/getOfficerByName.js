const getAllOfficers = require('./getAllOfficers')

const getOfficerByName = async(name) => {
    try {
        const dataOfficers = await getAllOfficers(name)
        const getDataByName = await dataOfficers.filter((officer) => 
        officer.name.toLowerCase().includes(name.toLowerCase()))
    return getDataByName
    } catch (error) {
        throw error
    }
}

module.exports = getOfficerByName