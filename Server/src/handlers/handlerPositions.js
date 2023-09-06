const postNewPosition = require('../controllers/positions/postPosition')
const getAllPositions = require('../controllers/positions/getAllPositions')
const postPosition = async(req, res) => {
    const {department, position, local, salary, shedule} = req.body
    try {
        const newPosition = await postNewPosition(department, position, local, salary, shedule);
        return newPosition ? res.status(201).json(newPosition) : res.status(404).json('Datos erroneos')

    } catch (error) {
        throw error(error)
    }
}


const getPosition = async(req, res) => {
    try {
        const getData = await getAllPositions();
        return getData ? res.status(200).json(getData) : res.status(400).json('Error al acceder a la data')
    } catch (error) {
        throw error
    }
}

module.exports = {postPosition, getPosition}