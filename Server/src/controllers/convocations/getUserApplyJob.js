const { ApplyWork, Officer, Convocation } = require('../../db')
const { Op } = require('sequelize')

const getUserApplyJob = async(id) => {
    try {
        const dataApplications = await ApplyWork.findAll({
          where:{
            [Op.or]:
            {officer_id: id}
          },
          include: [
            {
              model: Officer,
              attributes: ['name','phone','email'], 
            },
            {
              model: Convocation,
              attributes: ['title','state'], 
            },
          ],
        });
    
        return dataApplications;
      } catch (error) {
        throw new Error('Un error ha ocurrido buscando las aplicaciones a vacancias del usuario.');
      }
}

module.exports = getUserApplyJob;