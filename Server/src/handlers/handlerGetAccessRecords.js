// const getRegistrarAcceso = require('../controllers/controlacceso/getControlAccesoController')


// const handlerAllRegistrarAcceso = async(req, res) => {
//     const { name } = req.query
//     try {
//         if(name){
//             const getAllDataOfficers = await getRegistrarAcceso(name)
//             return getAllDataOfficers.length > 0 ? res.status(200).json(getAllDataOfficers) : res.status(404).send('Funcionario no registrado')
//         } else {
//             return getAllDataOfficers ? res.status(200).json(getAllDataOfficers) : res.status(404).json('Hubo un error al registrar los datos del funcionarios')
//         }
//     } catch (error) {
//         error.message = 'Error en el procedimiento'
//         return res.status(500).json({ error: error.message })
//     }
// }


// module.exports = {handlerAllRegistrarAcceso,
// }

const getAccessRecords = require('../controllers/access/getAccessRecords');
const getAccessRecordsByName = require('../controllers/access/getAccessRecordsByName');
const postAccessRecord = require('../controllers/access/postAccessRecord');

const handlerGetAccessRecords = async (req, res) => {
    try {
        const { name } = req.query; // Obtener el parámetro 'name' de la consulta
        if (name) {
            // Validar caracteres del nombre (solo letras, espacios y tildes)
            const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!regex.test(name)) {
                return res.status(400).json({ error: 'El nombre contiene caracteres inválidos.' });
            }

            const accessRecordsByName = await getAccessRecordsByName(name);

            if (accessRecordsByName.message) {
                return res.status(404).json({ message: accessRecordsByName.message });
            }

            return res.status(200).json(accessRecordsByName);
        } else {
            const allAccessRecords = await getAccessRecords();
            return res.status(200).json(allAccessRecords);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los registros de acceso.' });
    }
};

/*
const handlerPostAccessRecords = async (req, res) => {
    try {
      const { ip_publico, tipoAcceso } = req.body;
      const userId = req.user?.id; // Obtener el ID del usuario desde el middleware de autenticación
  
      if (!ip_publico || !tipoAcceso) {
        return res.status(400).json({ message: "Faltan datos: 'ip_publico' y 'tipoAcceso'." });
      }
  
      if (!['entrada', 'salida'].includes(tipoAcceso)) {
        return res.status(400).json({ message: "El tipo de acceso debe ser 'entrada' o 'salida'." });
      }
  
      const sucursal = await SucursalIP.findOne({ where: { ip_publico } });
  
      if (!sucursal) {
        return res.status(404).json({ message: "No se encontró una sucursal asociada al IP público." });
      }
  
      if (tipoAcceso === 'entrada') {
        await RegistroAcceso.create({
          tipoAcceso: 'entrada',
          tipoDispositivo: req.headers['user-agent'] || 'Desconocido',
          sucursalIP: sucursal.id,
          officerId: userId,
        });
  
        return res.status(201).json({ message: "Entrada registrada exitosamente." });
      } else if (tipoAcceso === 'salida') {
        const registro = await RegistroAcceso.findOne({
          where: { officerId: userId, tipoAcceso: 'entrada', sucursalIP: sucursal.id },
          order: [['fechaHora', 'DESC']],
        });
  
        if (!registro) {
          return res.status(404).json({ message: "No se encontró un registro de entrada para marcar salida." });
        }
  
        registro.tipoAcceso = 'salida';
        registro.fechaHora = new Date();
        await registro.save();
  
        return res.status(200).json({ message: "Salida registrada exitosamente.", registro });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor.", error });
    }
  };*/

  /*const handlerPostAccessRecords = async (req, res) => {
    try {
        const { ip_publico, tipoAcceso } = req.body;
        const officerId = req.user?.id; // Obtener el ID del usuario desde el middleware de autenticación

        // Llamar al controlador para manejar la lógica de la base de datos
        const response = await postAccessRecord({ ip_publico, tipoAcceso, officerId});

        // Retornar la respuesta generada por el controlador
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor.", error });
    }
};*/

const handlerPostAccessRecords = async (req, res) => {
    try {
        const ip_publico = req.body.ip_publico || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const { tipoAcceso, officerId, sucursalIP} = req.body;

        if (!officerId) {
            return res.status(400).json({ message: 'El officerId es requerido.' });
        }

        if (!ip_publico) {
            return res.status(400).json({ message: 'La dirección IP es requerida.' });
        }

        // Verificar que sucursalIP sea un número entero
        if (isNaN(sucursalIP)) {
            return res.status(400).json({ message: 'La sucursalIP debe ser un número entero.' });
        }

        // Llamar al controlador para manejar la lógica de la base de datos
        const response = await postAccessRecord(ip_publico, tipoAcceso, officerId, parseInt(sucursalIP));

        if (response.error) {
            return res.status(400).json({ message: response.error });
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error en handlerPostAccessRecords:', error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};


module.exports = { handlerGetAccessRecords, handlerPostAccessRecords };
