const {Position, Local } = require('../../db')

const postNewPosition = async(department, position, locals, salary, shedule) => {
  try {
    const positionExists = await Position.findOne({
      where: { position }, // Debe coincidir con el campo de posición
    });

    if (positionExists) {
      return positionExists; // La posición ya existe, no es necesario crearla nuevamente.
    }

    // Busca o crea el local.
    // let localInstance = await Local.findOne({
    //   where: { local }, // Debe coincidir con el campo de local
    // });

    // if (!localInstance) {
    //   // Si el local no existe, créalo.
    //   localInstance = await Local.create({ local }); // Debe coincidir con el campo de local
    // }

    const createdPosition = await Position.create({
      department,
      position, // Debe coincidir con el campo de posición
      salary,
      shedule,
    });

    for (const localName of locals) {
      let localInstance = await Local.findOne({
        where: { local: localName },
      });

      // if (!localInstance) {
      //   // Si el local no existe, créalo.
      //   localInstance = await Local.create({ local: localName });
      // }

      // Asocia la posición al local.
      await createdPosition.addLocal(localInstance);
    }

    // Asocia la posición al local.
    // await createdPosition.addLocal(localInstance);

    return createdPosition;
    } catch (error) {
        console.error('Ocurrió un error al crear o buscar el cargo', error);
        throw error;
    }
}

module.exports = postNewPosition