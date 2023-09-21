const { ApplyWork, Officer, Convocation } = require('../../db')

const postApplyJob = async(officerId, convocationId) =>{
    try {
        const createApply = await ApplyWork.create({ officer_id: officerId, convocation_id: convocationId });
        return createApply
    } catch (error) {
        throw new Error('Hubo un error al enviar la postulación')
    }
    // Verificar si el funcionario y la vacante existen
    // const officer = await Officer.findByPk(officerId);
    // const vacancy = await Convocation.findByPk(convocationId);

    // if (!officer || !vacancy) {
    //   return res.status(404).json({ error: 'Funcionario o vacante no encontrados' });
    // }
}

module.exports = postApplyJob;