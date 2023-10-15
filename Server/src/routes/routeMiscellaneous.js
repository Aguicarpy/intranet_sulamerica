const {Router} = require('express');
const { handlerPostEventCalendar, handlerAllEvents, handlerHolidaysCalendar } = require('../handlers/handlerMiscellaneous');
const routeMiscellaneous = Router();
const authenticateToken = require('../helpers/authenticateToken')

routeMiscellaneous.post('/event', authenticateToken ,handlerPostEventCalendar)
routeMiscellaneous.get('/event', authenticateToken, handlerAllEvents)
routeMiscellaneous.get('/event/holidays', handlerHolidaysCalendar)

module.exports = routeMiscellaneous;