const { Router } = require('express');
const { postLogin } = require('../controllers/auth.controller');

const router = Router();

//Al hacer login genera token
router.post('/login', postLogin );

module.exports = router;