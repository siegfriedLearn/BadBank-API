const { Router } = require('express');
const { getAll } = require('../controllers/users.controller');

const router = Router();

router.get('/all', getAll );

module.exports = router;