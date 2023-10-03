const { Officer, Position, Local } = require('../../db')

const postNewOfficer = async (name, birthDay, imageUrl, phone, typeUser, email, position, locals, password) => {
  try {
    const [officer, created] = await Officer.findOrCreate({
      where: { email },
      defaults: {
        name,
        birthDay,
        imageUrl,
        phone,
        typeUser,
        password,
      },
    });
    
    if (created) {
      // Asocia el funcionario a la posición.
      const findPosition = await Position.findOne({ where: { position } });
      if (findPosition) {
        await officer.addPosition(findPosition);
      }

      // Itera sobre cada sucursal en el array 'locals' y asocia el funcionario a cada una.
      for (const localName of locals) {
        const findLocal = await Local.findOne({ where: { local: localName } });
        if (findLocal) {
          await officer.addLocal(findLocal);
        }
      }
    }

    return officer;
  } catch (error) {
    console.error("Ocurrió un error al crear o buscar el usuario", error);
    throw error;
  }
};

module.exports = postNewOfficer;
