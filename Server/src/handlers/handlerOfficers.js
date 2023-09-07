const postNewOfficer = require('../controllers/officers/postOfficer')
const getAllOfficers = require('../controllers/officers/getAllOfficers')
const getOfficerByName = require('../controllers/officers/getOfficerByName')
const getOfficerById = require('../controllers/officers/getOfficerById')
const modifyOfficer = require('../controllers/officers/putOfficerData')
const deleteOfficer = require('../controllers/officers/deleteOfficer')

const postOfficer = async(req,res) => {
    const {name, birthDay, phone, email, position} = req.body
    try {
        const chargeNewOfficer = await postNewOfficer(name, birthDay, phone, email, position)
        return chargeNewOfficer ? res.status(201).json({Officers: chargeNewOfficer}) : res.status(404).json('Hubo un error al cargar al nuevo funcionario')

    } catch (error) {
        error.message = 'Ocurrio un error en el procedimiento'
        return res.status(500).json({ error: error.message })
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
        return res.status(500).json({ error: error.message })
    }
}

const getOfficerDataById = async(req, res) =>{
    const {id} = req.params
    try {
        const getDataById = await getOfficerById(id)
        return getDataById ? res.status(200).json(getDataById) : res.status(404).send('Funcionario no identificado')
    } catch (error) {
        error.message = 'Error en el procedimiento'
        return res.status(500).json({ error: error.message })
    }
}

const updateOfficerData = async(req,res) => {
    const id = req.params.id;
    const {name, birthDay, phone, email, position} = req.body;
    try {
        if(!name || !birthDay || !phone || !email || !position){
            return res.status(404).json({error: 'Alguno de los campos está vacio, debe rellenar todos los campos para actualizar los datos!'});
        }
        const updateDataById = await modifyOfficer(id, name, birthDay, phone, email, position);
        return res.status(200).json(updateDataById);
    } catch (error) {
        error.message = 'Ocurrió un error inesperado al actualizar los datos'
        return res.status(500).json({ error: error.message })
    }
}

const deleteOfficerData = async(req, res) => {
    const id = req.params.id;
  try {
    const officerDeleted = await deleteOfficer(id);
    return res.status(200).json(officerDeleted);
  } catch (error) {
    error.message = "Ocurrió un error al eliminar los datos del funcionario"
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {postOfficer, getOfficerData, getOfficerDataById, updateOfficerData, deleteOfficerData}