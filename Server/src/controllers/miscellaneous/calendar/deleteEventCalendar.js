const { Event } = require('../../../db');

const deleteEventOnEndTime = async (id) => {
  try {
    const event = await Event.findByPk(id);

    if (!event) {
      throw new Error('Evento no encontrado');
    }

    const endTime = new Date(event.end).getTime();
    const currentTime = new Date().getTime();

    // Comprueba si la hora actual es mayor o igual a la hora en que termina el evento
    if (currentTime >= endTime) {
        await event.destroy();
        return true; 
      }

    return false; 
  } catch (error) {
    throw new Error('Error al eliminar el evento: ' + error.message);
  }
};

module.exports = deleteEventOnEndTime;
