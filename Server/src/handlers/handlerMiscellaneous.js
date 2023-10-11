const postEventCalendar = require('../controllers/miscellaneous/calendar/postEventCalendar')
const getAllEvents = require('../controllers/miscellaneous/calendar/getAllEvent')

const handlerPostEventCalendar = async(req, res) => {
    const { title, description, start } = req.body
    const id = req.user.id; // Obtén el ID del usuario desde el token JWT
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
        const allEvents = await getAllEvents(id)
        return res.json(allEvents)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {handlerPostEventCalendar, handlerAllEvents}