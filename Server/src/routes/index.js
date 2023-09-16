const { Router } = require('express');
const routeOfficers = require('./routeOfficers');
const routePositions = require('./routePositions')
const routeAccess = require('./routeAccess');
const routeConvocations = require('./routeConvocations');

const routes = Router();

routes.use('/officers', routeOfficers);
routes.use('/positions', routePositions);
routes.use('/authAccess', routeAccess)
routes.use('/convocations', routeConvocations)

module.exports = routes;