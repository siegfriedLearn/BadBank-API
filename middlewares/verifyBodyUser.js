const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper')

//Estos son los campos que se verifican antes de enviar la petición a la base de datos
const validateCreate = [
    check('uid')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('username')
        .exists()
        .withMessage('No se encuentra este campo')
        .isEmail()
        .withMessage('Debe ser un correo valido')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('name')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('last_name')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('password')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('profile_id')
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

//Validación antes de actualizar usuario
const validateUpdate = [
    check('uid')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('username')
        .exists()
        .withMessage('No se encuentra este campo')
        .isEmail()
        .withMessage('Debe ser un correo valido')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('name')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('last_name')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('profile_id')
        .exists()
        .withMessage('No se encuentra este campo')
        .isNumeric()
        .withMessage('Este dato debe ser numérico')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('state')
        .exists()
        .withMessage('No se encuentra este campo')
        .isBoolean()
        .withMessage('Este dato debe ser boolean')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),

    check('phone')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),



    (req, res, next) => {
        validateResult(req, res, next)
    },

]

//Validación antes de actualizar perfil del usuario
const validateProfile = [

    check('profile_id')
        .exists()
        .withMessage('No se encuentra este campo')
        .isNumeric()
        .withMessage('Este dato debe ser numérico')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),


    (req, res, next) => {
        validateResult(req, res, next)
    },

]

//Validación antes de actualizar perfil del usuario
const validatePassword = [

    check('password')
        .exists()
        .withMessage('No se encuentra este campo')
        .not()
        .isEmpty()
        .withMessage('Campo vacío'),


    (req, res, next) => {
        validateResult(req, res, next)
    },

]

module.exports = { validateCreate, validateUpdate, validateProfile, validatePassword }