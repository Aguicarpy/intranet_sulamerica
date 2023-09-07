const {Officer} = require('../../db');

const modifyOfficer = async(id, name, birthDay, phone, email, position) => {
    let officerData = await Officer.findByPk(id);
    if(!officerData){
        throw new Error('Funcionario no encontrado');
    }
    officerData.name = name;
    officerData.birthDay = birthDay;
    officerData.phone = phone;
    officerData.email = email;
    officerData.position = position;

    await officerData.save();
    return ({message:'Datos actualizados correctamente', officerData});
}

module.exports = modifyOfficer;