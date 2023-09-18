const { ApplyWork, Officer } = require('../../db')

const getAllApplyJob = async() => {
    try {
        const dataApplycations = await ApplyWork.findAll(
        //     {
        //     include: {
        //         model: Officer,
        //         as: 'officer',
        //         attributes: ['name'],
        //     }
        // }
        )
        return dataApplycations
    } catch (error) {
        throw new Error('Un error ha ocurrido buscando la información.');
    }
}

module.exports = getAllApplyJob;