const postEventCalendar = require('../controllers/miscellaneous/calendar/postEventCalendar')
const getAllEvents = require('../controllers/miscellaneous/calendar/getAllEvent')
const getApiHolidays = require('../controllers/miscellaneous/calendar/getApiHolidays')
const postNewChat = require('../controllers/miscellaneous/chat/postNewChat')
const postNewPrivateChat = require('../controllers/miscellaneous/chat/postNewPrivateChat')
const postSendMessage = require('../controllers/miscellaneous/chat/postSendMessage')
const getMessages = require('../controllers/miscellaneous/chat/getMessages')


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

const handlerCreateChat = async(req, res) => {
    const { name, isGeneral } = req.body
    try {
        const newChat = await postNewChat(name, isGeneral)
        return res.status(201).json(newChat)
    } catch (error) {
        return res.status(500).json({error: error.message}) 
    }
}
const handlerCreatePrivateChat = async(req, res) => {
    const { name, isGeneral } = req.body
    const { userId } = req.params
    try {
        const newChat = await postNewPrivateChat(name, isGeneral, userId)
        return res.status(201).json(newChat)
    } catch (error) {
        return res.status(500).json({error: error.message}) 
    }
}

const handlerSendMessage = async(req, res) => {
    const { sender_id, content, sender_name } = req.body;
    const { chat_id } = req.params
    try {
        const newMessage = postSendMessage(chat_id, sender_id, content, sender_name)
        return res.status(201).json({data: newMessage})
    } catch (error) {
        return res.status(500).json({error: error.message}) 
    }
}

const handlerGetMessages = async(req, res) => {
    const { chatId } = req.params;
    try {
        const AllMessages = getMessages(chatId)
        if (AllMessages) {
            res.status(200).json(AllMessages);
          } else {
            res.status(404).json({ error: 'Chat no encontrado.' });
          }
    } catch (error) {
        return res.status(500).json({error: error.message}) 
    }
}

module.exports = {handlerPostEventCalendar, handlerAllEvents, handlerHolidaysCalendar, handlerCreateChat,
    handlerCreatePrivateChat, handlerSendMessage, handlerGetMessages, 
}