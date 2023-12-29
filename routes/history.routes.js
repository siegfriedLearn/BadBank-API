const { Router } = require('express');
const { verifyJwt, hasProfile } = require('../middlewares/index')



const { getBalanceByUid, modifyBalance } = require('../controllers/history.controller');

const router = Router();



//Obtener información del usuario
router.get('/balance', verifyJwt, getBalanceByUid );
router.post('/balance', verifyJwt, modifyBalance );


module.exports = router;