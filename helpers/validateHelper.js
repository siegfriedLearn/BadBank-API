const { validationResult } = require('express-validator');

//Verificar los errores que se generan al recibir los cammpos del body de una petición
const validateResult = ( req, res, next) => {

    try {
        validationResult(req).throw()
        return next();
    } catch (error) {
        res.status(403).json({
            status: 'error',
            errors: error.array()
        })
    }

}

module.exports = { validateResult }