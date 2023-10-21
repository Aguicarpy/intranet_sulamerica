const postNewOfficer = require('../controllers/officers/postOfficer')
const getAllOfficers = require('../controllers/officers/getAllOfficers')
const getOfficerByEmail = require('../controllers/officers/getOfficerByEmail')
const getOneOfficerData = require('../controllers/officers/getOneOfficerData')
const modifyOfficer = require('../controllers/officers/putOfficerData')
const deleteOfficer = require('../controllers/officers/deleteOfficer')
const setTypeUser = require('../controllers/officers/setTypeUser')
const filterOfficers = require('../controllers/officers/filterOfficers')
const { Officer } = require('../db')
const Sequelize = require('sequelize')

const postOfficer = async(req,res) => {

    const {name, birthDay, imageUrl, phone, typeUser, email, position, locals, password} = req.body

    try {
        if (!name || !birthDay || !phone || !typeUser || !email || !position || !password || !locals) {
            return res.status(400).json({ message: 'Campos vacios, rellene los datos necesarios' });
        }
        //Busco por email incluyendo que sean minisculas/mayusculas
        const existingOfficer = await Officer.findOne({
          where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), email.toLowerCase()),
          });
        if (existingOfficer) {
            return res.status(400).json({ message: 'Ya existe un funcionario asociado a ese email' });
        }
        if (!Array.isArray(locals)) {
          return res.status(400).json({ message: "'local' debe ser un array de sucursales" });
        }

        const chargeNewOfficer = await postNewOfficer(name, birthDay, imageUrl, phone, typeUser, email, position, locals, password)
        return res.status(201).json({Officer: chargeNewOfficer})

    } catch (error) {
        console.error("Ocurrió un error al crear su cuenta de usuario", error);
    return res
      .status(500)
      .json({ error: "Error al crear su cuenta de usuario" });
    }
}


const getOfficerData = async(req,res) => {
    const { email } = req.query
    try {
        const getAllDataOfficers = await getAllOfficers()
        if(email){
            const getOfficerDataByEmail = await getOfficerByEmail(email)
            return getOfficerDataByEmail.length > 0 ? res.status(200).json(getOfficerDataByEmail) : res.status(404).send('Funcionario no encontrado')
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
    let {name, birthDay, imageUrl, phone, email, DBpassword, userActualPassword, userNewPassword, position, department} = req.body;
    try {
        if(!email){
            return res.status(400).json({ error: "Ingrese el Email" });
        } else {
            const updateData = await modifyOfficer(name, birthDay, imageUrl, phone, email, DBpassword, userActualPassword, userNewPassword, position, department);
            if (updateData) {
              return res.status(200).json(updateData);
            } else {
              return res.status(500).json({ error: "No se pudo actualizar los datos" });
            }
        }
    } catch (error) {
      console.error("Error en el controlador:", error);
      return res.status(500).json({ error: "Ocurrió un error inesperado al actualizar los datos" });
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

const handlerFilters = async(req, res) => {
  const { orden, position, local, department } = req.query
  try {
    const usersFiltered = await filterOfficers(orden, position, local, department)
    return res.status(200).json(usersFiltered)
  } catch (error) {
    console.error("Error al filtrar los datos:", error);
    return res.status(500).json({ error: "Error al filtrar los datos" });
  }
}

module.exports = {
  postOfficer, getOfficerData, getOfficerDataLogged,updateOfficerData, deleteOfficerData,
  handlerSetTypeUser, handlerFilters}