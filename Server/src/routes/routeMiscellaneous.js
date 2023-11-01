const {Router} = require('express');
const { handlerPostEventCalendar, handlerAllEvents, handlerHolidaysCalendar, handlerCreateChat,handlerCreatePrivateChat,
handlerSendMessage, handlerGetMessages } = require('../handlers/handlerMiscellaneous');
const routeMiscellaneous = Router();
const authenticateToken = require('../helpers/authenticateToken')

routeMiscellaneous.post('/event', authenticateToken ,handlerPostEventCalendar)
routeMiscellaneous.get('/event', authenticateToken, handlerAllEvents)
routeMiscellaneous.get('/event/holidays', handlerHolidaysCalendar)
routeMiscellaneous.post('/createChat', handlerCreateChat)
routeMiscellaneous.post('/createChat/:userId', handlerCreatePrivateChat)
routeMiscellaneous.post('/sendMessage/:chat_id', handlerSendMessage)
routeMiscellaneous.get('/messages/:chatId', handlerGetMessages)

module.exports = routeMiscellaneous;