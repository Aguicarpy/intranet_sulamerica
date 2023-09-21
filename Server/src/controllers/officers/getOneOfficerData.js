const getAllOfficers = require('./getAllOfficers')

const getOneOfficerData = async(email) => {
    try {
        const dataOfficers = await getAllOfficers(email)
        const getData = await dataOfficers.find((officer) => officer.email === email)
    return getData
    } catch (error) {
        throw error
    }
}

module.exports = getOneOfficerData;