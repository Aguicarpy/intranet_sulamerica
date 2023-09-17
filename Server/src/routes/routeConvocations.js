const {Router} = require('express');
const routeConvocations = Router();
const { handlerPostConvocation, handlerAllConvocations } = require('../handlers/handlerConvocations');


routeConvocations.post('/',handlerPostConvocation);
routeConvocations.get('/',handlerAllConvocations);


module.exports = routeConvocations;