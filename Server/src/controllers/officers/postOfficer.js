const { Officer, Position } = require('../../db')

const postNewOfficer = async(name, birthDay, phone, email, position) => {
    const createOfficerData = await Officer.create({name, birthDay, phone, email})
    
        const findPosition = await Position.findOne({
            where: { position }
        })
        createOfficerData.addPosition(findPosition)
    return createOfficerData
}

module.exports = postNewOfficer