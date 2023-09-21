const { Officer } = require('../../db')

const deleteOfficer = async(id) => {
    const officerData = await Officer.findOne({ where: { id } });

	if(officerData){
		const userDeleted = await Officer.destroy({ where: { id } })
		return userDeleted
	} else {
		return 'Funcionario no encontrado'
	}
}

module.exports = deleteOfficer;