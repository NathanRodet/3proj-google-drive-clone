var express = require('express');
var router = express.Router();
const jwt = require('../utils/jwt');
const driveController = require('../controllers/driveController');
const { upload } = require('../utils/fileTransaction');

// Path : /drive

router
  .post('/', jwt.authenticateToken, upload.single('file'), driveController.postDocument)
  .get('/', jwt.authenticateToken, driveController.getUserDocuments)
  .get('/specific/file/:fileId', jwt.authenticateToken, driveController.getDocumentById)
  .get('/specific/file/download/:fileId', jwt.authenticateToken, driveController.downloadDocumentById)
  .delete('/specific/file/:fileId', jwt.authenticateToken, driveController.deleteDocumentById);

module.exports = router;