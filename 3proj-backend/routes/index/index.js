const express = require('express');
const router = express.Router();

/* GET index */
router.get('/', async (req, res) => {
  try {
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error });
  }
});

router.get('/teapot', async (req, res) => {
  try {
    res.status(418).json("I'm a teapot!");
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error });
  }
});

module.exports = router;
