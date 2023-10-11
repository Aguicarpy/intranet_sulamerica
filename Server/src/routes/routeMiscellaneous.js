const {Router} = require('express');
const { handlerPostEventCalendar, handlerAllEvents } = require('../handlers/handlerMiscellaneous');
const routeMiscellaneous = Router();
const authenticateToken = require('../helpers/authenticateToken')

routeMiscellaneous.post('/event', authenticateToken ,handlerPostEventCalendar)
routeMiscellaneous.get('/event', authenticateToken, handlerAllEvents)

module.exports = routeMiscellaneous;