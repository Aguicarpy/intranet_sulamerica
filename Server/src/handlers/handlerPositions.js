const postNewPosition = require('../controllers/positions/postPosition')
const getAllPositions = require('../controllers/positions/getAllPositions')

const postPosition = async (req, res) => {
    const { department, position, local, salary, shedule } = req.body;
    try {
        if (!department || !position || !local || !salary || !shedule) {
            return res.status(400).json({ message: 'Campos vacios, rellene los datos necesarios' });
        }
        const newPosition = await postNewPosition(department, position, local, salary, shedule);
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

const getPosition = async(req, res) => {
    try {
        const getData = await getAllPositions();
        return getData ? res.status(200).json(getData) : res.status(400).json('Error al acceder a la data')
    } catch (error) {
        throw error
    }
}

module.exports = {postPosition, getPosition}