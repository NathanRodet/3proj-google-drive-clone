var express = require('express');
var router = express.Router();
const jwt = require('../utils/jwt');

const usersController = require('../controllers/usersController');

// Path : /users

router.get('/', usersController.getUsers)
  .get('/specific/:userId', jwt.authenticateToken, usersController.getUserById)
  .get('/count', usersController.getCount)
  .post('/', usersController.postUser)
  .delete('/:userId', jwt.authenticateToken, usersController.deleteById)
  .delete('/self', jwt.authenticateToken, usersController.deleteSelf)
  .patch('/username', jwt.authenticateToken, usersController.patchUsername)
  .patch('/first_name', jwt.authenticateToken, usersController.patchFirstName)
  .patch('/last_name', jwt.authenticateToken, usersController.patchLastName)
  .patch('/password', jwt.authenticateToken, usersController.patchPassword)
  .patch('/mail', jwt.authenticateToken, usersController.patchMail)
  .patch('/is_blocked/:userId', jwt.authenticateToken, usersController.patchIsBlocked)

module.exports = router;