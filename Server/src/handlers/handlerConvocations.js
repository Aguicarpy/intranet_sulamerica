const postNewConvocation = require('../controllers/convocations/postNewConvocation')
const getAllConvocations = require('../controllers/convocations/getAllConvocations')
// const { Position } = require('../db')

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


module.exports = { handlerPostConvocation, handlerAllConvocations }