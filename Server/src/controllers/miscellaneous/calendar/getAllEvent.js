const { Event, Officer } = require('../../../db')
const { Op } = require('sequelize');

const getAllEvents = async(id, area) => {
    try {
        const allEvents = await Event.findAll({
            where: {
              [Op.or]: [
                { officer_id: id },  // Eventos del usuario actual
                { position_id: area } // Eventos de otros usuarios en la misma área
              ]
            }
          })

        return allEvents
    } catch (error) {
        console.error('Error de Sequelize:', error); 
        throw error;      
    }
}

module.exports = getAllEvents;