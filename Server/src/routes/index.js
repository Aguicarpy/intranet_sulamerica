const { Router } = require('express');
const routeOfficers = require('./routeOfficers');
const routePositions = require('./routePositions')
const routeAccess = require('./routeAccess');
const routeConvocations = require('./routeConvocations');
const routeMiscellaneous = require('./routeMiscellaneous');

const routes = Router();

routes.use('/officers', routeOfficers);
routes.use('/positions', routePositions);
routes.use('/authAccess', routeAccess)
routes.use('/convocations', routeConvocations)
routes.use('/miscellaneous', routeMiscellaneous)

module.exports = routes;