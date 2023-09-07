const { Router } = require('express');
const routeOfficers = Router();

const {postOfficer, getOfficerData, getOfficerDataById, updateOfficerData, deleteOfficerData} = require('../handlers/handlerOfficers');


routeOfficers.post('/', postOfficer);
routeOfficers.get('/', getOfficerData);
routeOfficers.get('/:id', getOfficerDataById);
routeOfficers.put('/:id', updateOfficerData);
routeOfficers.delete('/:id', deleteOfficerData);

module.exports = routeOfficers;