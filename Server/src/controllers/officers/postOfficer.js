const { Officer, Position } = require('../../db')

const postNewOfficer = async (name, birthDay, phone, typeUser, email, position, password) => {
  try {
    const [officer, created] = await Officer.findOrCreate({
      where: { email },
      defaults: {
        name,
        birthDay,
        phone,
        typeUser,
        password,
      },
    });
    // if(officer.email){
    //     return 'Ya existe un funcionario asociado a ese email'
    // }
    if (created) {
      const findPosition = await Position.findOne({
        where: { position },
      });

      if (findPosition) {
        await officer.addPosition(findPosition);
      }
    }

    return officer;
  } catch (error) {
    console.error("Ocurrió un error al crear o buscar el usuario", error);
    throw error;
  }
};

module.exports = postNewOfficer;
