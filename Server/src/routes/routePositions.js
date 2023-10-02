const { Router } = require('express');
const { handlerPostPosition, handlerGetPositions, handlerPostLocal, handlerAllLocals} = require('../handlers/handlerPositions');

const routePositions = Router();

routePositions.post('/', handlerPostPosition)
routePositions.get('/', handlerGetPositions)
routePositions.post('/local', handlerPostLocal)
routePositions.get('/local', handlerAllLocals)

module.exports = routePositions;