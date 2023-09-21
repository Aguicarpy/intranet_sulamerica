const { Router } = require('express');
const routeOfficers = Router();

const {postOfficer, getOfficerData, getOfficerDataLogged, updateOfficerData, deleteOfficerData, handlerSetTypeUser} = require('../handlers/handlerOfficers');

 
routeOfficers.post('/', postOfficer);
routeOfficers.get('/', getOfficerData);
routeOfficers.get('/userData', getOfficerDataLogged);
routeOfficers.put('/userUpdate', updateOfficerData);
routeOfficers.delete('/userDelete', deleteOfficerData);
routeOfficers.put('/changetype', handlerSetTypeUser)

module.exports = routeOfficers;