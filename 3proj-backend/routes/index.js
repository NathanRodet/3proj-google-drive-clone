const express = require('express');
const router = express.Router();

/* GET index */
router.get('/', function (req, res, next) {
  try {
    res.send('index');
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
