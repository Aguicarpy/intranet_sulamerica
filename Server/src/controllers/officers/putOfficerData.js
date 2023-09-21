const {Officer} = require('../../db');
const {hashPassword, comparePassword} = require('../../helpers/passwordHashed')

const modifyOfficer = async(name, birthDay, phone, email, DBpassword, userActualPassword, userNewPassword) => {
    try {
        if (!DBpassword && !userActualPassword && !userNewPassword) {
          const [updatedRowsCount, updatedRows] = await Officer.update(
            {
              name: name,
              birthDay: birthDay,
              phone: phone,
            },
            {
              where: { email: email },
              returning: true, // Esta opción permite que retorne los registros actualizados
            }
          );
    
        if (updatedRowsCount === 0) {
        throw new Error(`Usuario con email ${email} no encontrado`);
        }
    
          // Devolver el primer registro actualizado (puede haber más si se actualizan varias filas)
            return updatedRows[0];
        } else {
          const match = await comparePassword(userActualPassword, DBpassword);
          if (match) {
            const newDBPassword = await hashPassword(userNewPassword);
            const [updatedRowsCount, updatedRows] = await Officer.update(
              {
                name: name,
                birthDay: birthDay,
                phone: phone,
                password: newDBPassword,
              },
              {
                where: { email: email },
                returning: true, // Esta opción permite que retorne los registros actualizados
              }
            );
            if (updatedRowsCount === 0) {
              throw new Error("No se aplicaron los cambios");
            }
            // Devolver el primer registro actualizado (puede haber más si se actualizan varias filas)
            return updatedRows[0];
          } else {
            throw new Error("Contraseña actual incorrecta");
          }
        }
      } catch (error) {
        throw new Error(error.message);
      }
}

module.exports = modifyOfficer;