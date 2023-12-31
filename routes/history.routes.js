
const { Router } = require('express');
const { verifyJwt, hasProfile } = require('../middlewares/index')



const { getBalanceByUid, modifyBalance, transfer } = require('../controllers/history.controller');

const router = Router();



//Obtener información del usuario
router.get('/balance', verifyJwt, getBalanceByUid );

//Modificar balance del usuario
router.post('/balance', verifyJwt, modifyBalance );

//Hacer transferencia
router.post('/transfer', verifyJwt, transfer );


module.exports = router;