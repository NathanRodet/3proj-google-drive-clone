var express = require('express');
var router = express.Router();
const jwt = require('../utils/jwt');

const usersController = require('../controllers/usersController');
const driveController = require('../controllers/driveController');

// Path : /users

router
  .get('/', usersController.getUsers)
  .get('/specific/user/:userId', jwt.authenticateToken, usersController.getUserById)
  .get('/count', usersController.getCount)
  .post('/', usersController.postUser)
  .delete('/specific/user/:userId', jwt.authenticateToken, driveController.deleteUserDocumentsById, usersController.deleteUserById)
  .delete('/self', jwt.authenticateToken, driveController.deleteUserDocuments, usersController.deleteSelfUser)
  .patch('/username', jwt.authenticateToken, usersController.patchUsername)
  .patch('/first_name', jwt.authenticateToken, usersController.patchFirstName)
  .patch('/last_name', jwt.authenticateToken, usersController.patchLastName)
  .patch('/password', jwt.authenticateToken, usersController.patchPassword)
  .patch('/mail', jwt.authenticateToken, usersController.patchMail)
  .patch('/is_blocked/:userId', jwt.authenticateToken, usersController.patchIsBlocked)

module.exports = router;