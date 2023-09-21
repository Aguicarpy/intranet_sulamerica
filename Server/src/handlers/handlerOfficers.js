const postNewOfficer = require('../controllers/officers/postOfficer')
const getAllOfficers = require('../controllers/officers/getAllOfficers')
const getOfficerByName = require('../controllers/officers/getOfficerByName')
const getOneOfficerData = require('../controllers/officers/getOneOfficerData')
const modifyOfficer = require('../controllers/officers/putOfficerData')
const deleteOfficer = require('../controllers/officers/deleteOfficer')
const setTypeUser = require('../controllers/officers/setTypeUser')

const postOfficer = async(req,res) => {

    const {name, birthDay, phone, typeUser, email, position, password} = req.body

    try {
        if (!name || !birthDay || !phone || !typeUser || !email || !position || !password) {
            return res.status(400).json({ message: 'Campos vacios, rellene los datos necesarios' });
        }
        const chargeNewOfficer = await postNewOfficer(name, birthDay, phone, typeUser, email, position, password)
        return res.status(201).json({Officers: chargeNewOfficer})

    } catch (error) {
        console.error("Ocurrió un error al crear su cuenta de usuario", error);
    return res
      .status(500)
      .json({ error: "Error al crear su cuenta de usuario" });
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

const getOfficerDataLogged = async(req, res) =>{
    const {email} = req.query
    try {
        const getData = await getOneOfficerData(email)
        return getData ? res.status(200).json(getData) : res.status(404).send('Funcionario no identificado')
    } catch (error) {
        error.message = 'Error en el procedimiento'
        return res.status(500).json({ error: error.message })
    }
}

const updateOfficerData = async(req,res) => {
    let {name, birthDay, phone, email, DBpassword, userActualPassword, userNewPassword} = req.body;
    try {
        if(!email){
            return res.status(400).json({ error: "Ingrese el Email" });
        } else {
            let updateData = await modifyOfficer(name, birthDay, phone, email, DBpassword, userActualPassword, userNewPassword);
            return res.status(200).json(updateData);
        }
    } catch (error) {
        error.message = 'Ocurrió un error inesperado al actualizar los datos'
        return res.status(500).json({ error: error.message })
    }
}

const deleteOfficerData = async(req, res) => {
    const { id } = req.query;
    try {
      if (!id) {
        return res.status(400).json("Ingrese un id");
      }
      const user = await deleteOfficer(id);
      if (user === 1) {
        return res.status(200).json(`Usuario eliminado`);
      } else {
        return res.status(400).json("Eliminacion fallida");
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

const handlerSetTypeUser = async (req, res) => {
    const { id } = req.body;
    try {
      const adminUser = await setTypeUser(id);
      return res.status(200).json(adminUser);
    } catch (error) {
      console.error("Ocurrió un error al actualizar el tipo de usuario");
      return res.status(500).json({ error: error.message });
    }
  };

module.exports = {postOfficer, getOfficerData, getOfficerDataLogged, updateOfficerData, deleteOfficerData, handlerSetTypeUser}