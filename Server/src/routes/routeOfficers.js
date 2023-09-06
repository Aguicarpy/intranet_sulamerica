const { Router } = require('express');
const routeOfficers = Router();

const {postOfficer, getOfficerData} = require('../handlers/handlerOfficers');


routeOfficers.post('/', postOfficer);
routeOfficers.get('/', getOfficerData);


module.exports = routeOfficers;