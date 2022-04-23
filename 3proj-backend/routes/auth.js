var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

// Path : /auth

router.post('/', authController.authLogin);

module.exports = router;