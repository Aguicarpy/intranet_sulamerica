const { Event, Officer } = require('../../../db')

const postEventCalendar = async(title, description, start, id) => {
    try {
        const findOfficer = await Officer.findOne({ where: { id } })
        const createNewEventInCalendar = await Event.create({ title, description, start, officer_id: findOfficer.id })
        return createNewEventInCalendar
    } catch (error) {
        console.error('Error al crear el evento:', error);
        throw new Error('Un error ha ocurrido al postear el evento.');
    }

}

module.exports = postEventCalendar;