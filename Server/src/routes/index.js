const { Router } = require('express');
const routeOfficers = require('./routeOfficers');
const routePositions = require('./routePositions')
const routeAccess = require('./routeAccess')

const routes = Router();

routes.use('/officers', routeOfficers);
routes.use('/positions', routePositions);
routes.use('/authAccess', routeAccess)

module.exports = routes;