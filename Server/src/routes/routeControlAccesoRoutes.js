// const express = require('express');
// const { handlerAllRegistrarAcceso } = require('../handlers/handlerRegistroAcceso');

// const router = express.Router();

// router.get('/:name', handlerAllRegistrarAcceso);

// module.exports = router;

const { Router } = require('express');
const { handlerGetAccessRecords, handlerPostAccessRecords } = require('../handlers/handlerGetAccessRecords');

const routeControlAccesoRoutes = Router();

// Ruta para obtener todos los registros de acceso
routeControlAccesoRoutes.get('/', handlerGetAccessRecords);
routeControlAccesoRoutes.post('/', handlerPostAccessRecords);


module.exports = routeControlAccesoRoutes;
