const {Router} = require('express');
const routeConvocations = Router();
const { handlerPostConvocation, handlerAllConvocations, handlerApplyJob, handlerUserApplications, handlerAllApplications} = require('../handlers/handlerConvocations');
const authenticateToken = require('../helpers/authenticateToken')

routeConvocations.post('/', handlerPostConvocation);
routeConvocations.get('/', handlerAllConvocations);
routeConvocations.post('/applyjob', handlerApplyJob);
routeConvocations.get('/applyjobUser', authenticateToken, handlerUserApplications);
routeConvocations.get('/applyAlljobs', handlerAllApplications);


module.exports = routeConvocations;