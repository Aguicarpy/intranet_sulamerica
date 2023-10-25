const {Officer, Position, Local} = require('../../db');
const {hashPassword, comparePassword} = require('../../helpers/passwordHashed')

const modifyOfficer = async(name, birthDay, imageUrl, phone, email, DBpassword, userActualPassword, userNewPassword, position, department) => {
  try {
    // Definir los atributos que se van a actualizar
    const updates = {
      name,
      birthDay,
      phone,
      imageUrl
    };

    const officer = await Officer.findOne({
      where: { email },
      include: [Position, Local],
    });
    if (DBpassword && userActualPassword && userNewPassword) {
      // Cambiar la contraseña si se proporciona la contraseña actual y la nueva contraseña

      if (!officer) {
        throw new Error(`Usuario con email ${email} no encontrado`);
      }

      const match = await comparePassword(userActualPassword, officer.password);

      if (match) {
        const newDBPassword = await hashPassword(userNewPassword);
        updates.password = newDBPassword;
      } else {
        throw new Error("Contraseña actual incorrecta");
      }
    }

    // Actualizar la posición y el departamento si se proporcionan
    if (position) {
      const dataPosition = officer.Positions.map((position) => position.position).join(', ')
      updates.position = dataPosition;
    }

    if (department) {
      const dataDepartment = officer.Positions.map((position) => position.department).join(', ')
      updates.department = dataDepartment;
    }

    // Realizar la actualización en la base de datos
    const [updatedRowsCount] = await Officer.update(updates, {
      where: { email },
    });

    if (updatedRowsCount === 0) {
      throw new Error("No se aplicaron los cambios");
    }

    // Buscar el registro actualizado y devolverlo con las relaciones Position y Local incluidas
    const updatedOfficer = await Officer.findOne({
      where: { email },
      include: [Position, Local],
    });

    return updatedOfficer;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = modifyOfficer;