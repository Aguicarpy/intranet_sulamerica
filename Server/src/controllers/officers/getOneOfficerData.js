const {Officer} = require('../../db')

const getOneOfficerData = async(email) => {
    try {
        const user = await Officer.findOne({ where:{ email: email}})
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = getOneOfficerData;