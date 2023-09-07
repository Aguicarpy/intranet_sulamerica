const { Officer } = require('../../db')

const deleteOfficer = async(id) => {
    const officerData = await Officer.findByPk(id);
	if(!officerData){
		throw new Error('Funcionario no encontrado');
	}

	await officerData.destroy()
	return 'Datos del funcionario fue eliminada con éxito'
}

module.exports = deleteOfficer;