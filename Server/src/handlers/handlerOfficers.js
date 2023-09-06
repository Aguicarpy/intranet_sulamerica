const postNewOfficer = require('../controllers/officers/postOfficer')
const getAllOfficers = require('../controllers/officers/getAllOfficers')
const getOfficerByName = require('../controllers/officers/getOfficerByName')

const postOfficer = async(req,res) => {
    const {name, birthDay, phone, email, position} = req.body
    try {
        const chargeNewOfficer = await postNewOfficer(name, birthDay, phone, email, position)
        return chargeNewOfficer ? res.status(201).json({Officers: chargeNewOfficer}) : res.status(404).json('Hubo un error al cargar al nuevo funcionario')

    } catch (error) {
        error.message = 'Ocurrio un error en el procedimiento'
        throw error(error.message);
    }
}


const getOfficerData = async(req,res) => {
    const { name } = req.query
    try {
        const getAllDataOfficers = await getAllOfficers()
        if(name){
            const getOfficerDataByName = await getOfficerByName(name)
            return getOfficerDataByName.length > 0 ? res.status(200).json(getOfficerDataByName) : res.status(404).send('Funcionario no encontrado')
        } else {
            return getAllDataOfficers ? res.status(200).json(getAllDataOfficers) : res.status(404).json('Hubo un error al acceder a los datos de los funcionarios')
        }
    } catch (error) {
        error.message = 'Error en el procedimiento'
        throw error(error.message)
    }
}

module.exports = {postOfficer, getOfficerData}