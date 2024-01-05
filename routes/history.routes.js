
const { Router } = require('express');
const { verifyJwt, hasProfile } = require('../middlewares/index')



const { getBalanceByUid, modifyBalance, transfer } = require('../controllers/history.controller');

const router = Router();



//Obtener información del usuario
router.get('/balance', verifyJwt, getBalanceByUid );
router.post('/balance', verifyJwt, modifyBalance );
router.post('/transfer', transfer );


module.exports = router;