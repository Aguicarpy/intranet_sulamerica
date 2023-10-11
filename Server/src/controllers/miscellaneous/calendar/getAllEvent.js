const { Event, Officer } = require('../../../db')

const getAllEvents = async(id) => {
    try {
        const allEvents = await Event.findAll({ where: {officer_id: id} }
        //     {
        //     include: {
        //         model: Officer,
        //         attributes: ['email'],
        //         through: {
        //             attributes: [],
        //           },
        //     }
        // }
        )
        return allEvents
    } catch (error) {
        throw new Error('Error al acceder a todos los eventos')        
    }
}

module.exports = getAllEvents;