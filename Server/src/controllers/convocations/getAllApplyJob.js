const { ApplyWork, Officer, Convocation } = require('../../db')

const getAllApplyJob = async() => {
    try {
        const dataApplications = await ApplyWork.findAll({
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
        throw new Error('Un error ha ocurrido buscando la información.');
      }
}

module.exports = getAllApplyJob;