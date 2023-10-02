const { Router } = require('express');
const routeOfficers = Router();

const {postOfficer, getOfficerData, getOfficerDataLogged, updateOfficerData, deleteOfficerData, handlerSetTypeUser, handlerFilters} = require('../handlers/handlerOfficers');

 
routeOfficers.post('/', postOfficer);
routeOfficers.get('/', getOfficerData);
routeOfficers.get('/filter', handlerFilters)
routeOfficers.get('/userData', getOfficerDataLogged);
routeOfficers.put('/userUpdate', updateOfficerData);
routeOfficers.delete('/userDelete', deleteOfficerData);
routeOfficers.put('/changetype', handlerSetTypeUser)

module.exports = routeOfficers;