const getAllOfficers = require('./getAllOfficers')

const getOfficerByEmail = async(email) => {
    try {
        const dataOfficers = await getAllOfficers(email)
        const getDataByEmail = await dataOfficers.filter((officer) => officer.email.toLowerCase().includes(email.toLowerCase()))
        
        if (getDataByEmail.length === 0) {
            return null; 
        }
        return getDataByEmail
    } catch (error) {
        throw error
    }
}

module.exports = getOfficerByEmail