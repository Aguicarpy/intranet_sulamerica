const postEventCalendar = require('../controllers/miscellaneous/calendar/postEventCalendar')
const getAllEvents = require('../controllers/miscellaneous/calendar/getAllEvent')
const getApiHolidays = require('../controllers/miscellaneous/calendar/getApiHolidays')

const handlerPostEventCalendar = async(req, res) => {
    const { title, description, start } = req.body
    const id = req.user.id; // Obtén el ID del usuario desde el token JWT
    const department = req.user.department; // Obtén el ID del usuario desde el token JWT
    try {
        const newEvent = await postEventCalendar(title, description, start, id)
        return res.status(201).json(newEvent)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const handlerAllEvents = async(req, res) => {
    try {
        const id = req.user.id;
        const area = req.user.department;
        const allEvents = await getAllEvents(area, id)
        return res.json(allEvents)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const handlerHolidaysCalendar = async(req, res) =>{
    try {
        const dataHolidays = await getApiHolidays()
        return res.status(200).json(dataHolidays)
    } catch (error) {
        return res.status(500).json({error: error.message}) 
    }
}

module.exports = {handlerPostEventCalendar, handlerAllEvents, handlerHolidaysCalendar}