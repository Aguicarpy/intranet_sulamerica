const { Op } = require('sequelize');
const { Officer, Position,Local } = require('../../db');

const filterOfficers = async (orden, position, local, department) => {
  try {
    // Define los filtros iniciales
    const filters = {};

    // Aplica filtros adicionales si se especifican
    if (position) {
      filters['$Positions.position$'] = position;
    }
    if (local) {
        filters['$Locals.local$'] = local;
    }
    if (department) {
      filters['$Positions.department$'] = department;
    }

    // Define las opciones de ordenamiento
    const orderOptions = [];
    if (orden === 'name-ASC') {
      orderOptions.push(['name', 'ASC']);
    } else if (orden === 'name-DESC') {
      orderOptions.push(['name', 'DESC']);
    }

    // Realiza la consulta con los filtros y opciones de ordenamiento
    const officers = await Officer.findAll({
      where: filters,
      include: [
        { model: Position, attributes: ['department', 'position'], through: {attributes: [] } },
        {model: Local, attributes: ['local'], through: {attributes: [] }}],
        order: orderOptions,
    });

    return officers;
  } catch (error) {
    console.error('Error al filtrar y ordenar oficiales:', error);
    throw error;
  }
};

module.exports = filterOfficers;
