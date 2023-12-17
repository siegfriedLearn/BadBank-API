const { Router } = require('express');
const { getBalanceByUid, modifyBalance } = require('../controllers/history.controller');

const router = Router();

//Obtener el balance del usuario
router.get('/balance/:uid', getBalanceByUid );
router.post('/balance', modifyBalance );

module.exports = router;