const postNewPosition = require('../controllers/positions/postPosition')
const getAllPositions = require('../controllers/positions/getAllPositions')
const postNewLocal = require('../controllers/positions/postLocal')
const getAllLocals = require('../controllers/positions/getAllLocals')

const handlerPostPosition = async (req, res) => {
    const { department, position, locals, salary, shedule } = req.body;

  try {
    if (!department || !position || !locals || !salary || !shedule) {
      return res.status(400).json({ message: 'Campos vacíos, rellene los datos necesarios' });
    }

    const newPosition = await postNewPosition(department, position, locals, salary, shedule);
    return res.status(201).json(newPosition);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ error: error.message });
    } else if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    } else {
      error.message = 'Ocurrió un error inesperado al crear el cargo';
      return res.status(500).json({ error: error.message });
    }
  }
};

const handlerGetPositions = async(req, res) => {
    try {
        const getData = await getAllPositions();
        return getData ? res.status(200).json(getData) : res.status(400).json('Error al acceder a la data')
    } catch (error) {
        throw error
    }
}


const handlerPostLocal = async(req, res) => {
  const { local } = req.body
  try {
    const newLocal = await postNewLocal(local)
    return res.status(201).json(newLocal)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const handlerAllLocals = async(req, res) => {
    try {
      const getData = await getAllLocals();
      return getData ? res.status(200).json(getData) : res.status(400).json('Error al acceder a la data')
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {handlerPostPosition, handlerGetPositions, handlerPostLocal, handlerAllLocals}