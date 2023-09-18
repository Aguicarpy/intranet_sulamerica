const {Router} = require('express');
const routeConvocations = Router();
const { handlerPostConvocation, handlerAllConvocations, handlerApplyJob, handlerAllApplications } = require('../handlers/handlerConvocations');


routeConvocations.post('/', handlerPostConvocation);
routeConvocations.get('/', handlerAllConvocations);
routeConvocations.post('/applyjob', handlerApplyJob);
routeConvocations.get('/applyjob', handlerAllApplications);


module.exports = routeConvocations;