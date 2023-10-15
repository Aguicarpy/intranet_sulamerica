const { Event } = require('../../../db')

const getApiHolidays = async() => {
    try {
        const holidays = await Event.findAll({
            where: {
                department: 'Feriado' // Filtra por el departamento "Feriado"
            }
          })
        return holidays;
    } catch (error) {
        throw error;
    }
}

module.exports = getApiHolidays;