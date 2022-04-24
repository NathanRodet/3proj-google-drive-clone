var express = require('express');
var router = express.Router();
const jwt = require('../utils/jwt');
const driveController = require('../controllers/driveController');
const { upload } = require('../utils/fileTransaction');

// Path : /drive

router
  .post('/', upload.single('file'), driveController.postDocument)
  .get('/', driveController.getDocuments)
  .get('/specific/file/:fileId', driveController.getDocument)
  .delete('/specific/file/:fileId', driveController.deleteDocument);

module.exports = router;