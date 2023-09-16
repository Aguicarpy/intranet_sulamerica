const { Router } = require('express');
const routeOfficers = Router();

const {postOfficer, getOfficerData, getOfficerDataLogged, updateOfficerData, deleteOfficerData} = require('../handlers/handlerOfficers');

 
routeOfficers.post('/', postOfficer);
routeOfficers.get('/', getOfficerData);
routeOfficers.get('/userData', getOfficerDataLogged);
routeOfficers.put('/:id', updateOfficerData);
routeOfficers.delete('/:id', deleteOfficerData);

module.exports = routeOfficers;