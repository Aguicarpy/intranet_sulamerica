const { Event, Officer, Position} = require('../../../db')

const postEventCalendar = async(title, description, start, id) => {
    try {
        const findOfficer = await Officer.findOne({ where: { id }, include: {model: Position}})
        
        const createNewEventInCalendar = await Event.create({ title, description, start, officer_id: findOfficer.id, position_id: findOfficer.Positions[0].id, department: findOfficer.Positions[0].department })
        return createNewEventInCalendar
    } catch (error) {
        console.error('Error al crear el evento:', error);
        throw new Error('Un error ha ocurrido al postear el evento.');
    }

}

module.exports = postEventCalendar;