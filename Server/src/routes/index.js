const { Router } = require('express');
const routeOfficers = require('./routeOfficers');
const routePositions = require('./routePositions')

const routes = Router();

routes.use('/officers', routeOfficers);
routes.use('/positions', routePositions);

module.exports = routes;