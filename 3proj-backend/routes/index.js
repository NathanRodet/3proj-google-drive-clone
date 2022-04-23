var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

// Path : /index

router.get('/', indexController.indexNoContent);
router.get('/teapot', indexController.indexTeapot);

module.exports = router;