const postNewConvocation = require('../controllers/convocations/postNewConvocation');
const getAllConvocations = require('../controllers/convocations/getAllConvocations');
const postApplyJob = require('../controllers/convocations/postApplyJob');
const getAllApplyJob = require('../controllers/convocations/getAllApplyJob');

const handlerPostConvocation = async(req, res) => {
    const {title, places, state, position} = req.body
    try {
        const createConvocation = await postNewConvocation(title, places, state, position)
        return res.status(201).json({data: createConvocation});
    } catch (error) {
        error.message = 'Ocurrió un error inesperado al cargar la convocatoria'
        return res.status(500).json({ error: error.message })
    }
}

const handlerAllConvocations = async(req, res) => {
    try {
        const allDataConvocation = await getAllConvocations();
        return res.status(200).json({data: allDataConvocation})
    } catch (error) {
        error.message = 'Ocurrió un error inesperado al acceder a los datos'
        return res.status(500).json({ error: error.message })
    }
}


const handlerApplyJob = async(req, res) => {
    const { officerId, convocationId } = req.body
    try {
        const sendApplicationJob = await postApplyJob(officerId, convocationId);
        return res.status(201).json(sendApplicationJob)
    } catch (error) {
        return res.status(500).json({ error: 'Error al procesar la postulación' });
    }
}


const handlerAllApplications = async(req, res) => {
    try {
        const allDataApplycations = await getAllApplyJob();
        return res.status(200).json(allDataApplycations)
    } catch (error) {
        return res.status(500).json({ error: 'Error al acceder a las postulaciones' });  
    }
}



module.exports = { handlerPostConvocation, handlerAllConvocations, handlerApplyJob, handlerAllApplications}