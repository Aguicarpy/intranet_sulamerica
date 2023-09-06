const { Router } = require('express');
const { postPosition, getPosition } = require('../handlers/handlerPositions');

const routePositions = Router();

routePositions.post('/', postPosition)
routePositions.get('/', getPosition)

module.exports = routePositions;