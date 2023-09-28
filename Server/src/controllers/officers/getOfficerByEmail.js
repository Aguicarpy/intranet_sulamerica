const getAllOfficers = require('./getAllOfficers')

const getOfficerByEmail = async(email) => {
    try {
        const dataOfficers = await getAllOfficers(email)
        const getDataByName = await dataOfficers.filter((officer) => officer.email.toLowerCase().includes(email.toLowerCase()))
    return getDataByName
    } catch (error) {
        throw error
    }
}

module.exports = getOfficerByEmail