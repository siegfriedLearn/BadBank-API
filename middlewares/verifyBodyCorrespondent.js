const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper')

//Estos son los campos que se verifican antes de enviar la petición a la base de datos
const validateCreate = [
    check('code')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('name')
        .exists()
        .withMessage('No se encuentra este campo')
        .withMessage('Debe ser un correo valido')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('address')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('type')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('city_id')
        .exists()
        .withMessage('No se encuentra este campo')
        .isNumeric()
        .withMessage('Este dato debe ser numérico')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('users_id')
        .exists()
        .withMessage('No se encuentra este campo')
        .isNumeric()
        .withMessage('Este dato debe ser numérico')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]



module.exports = { validateCreate }