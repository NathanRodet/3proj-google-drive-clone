var express = require('express');
var router = express.Router();
const jwt = require('../utils/jwt');
const driveController = require('../controllers/driveController');
const { upload } = require('../utils/uploadFile');

// Path : /drive

router
  .post('/', jwt.authenticateToken, upload.single('file'), driveController.postDocument)
  /**
   * @swagger
   *  components:
   *    schemas:
   *      Auth:
   *        Type: object
   *        required:
   *          - username
   *          - password
   *        properties: 
   *          token:
   *            type: string
   *            description : The authentication token 
   *          duration:
   *            type: string
   *            description: The duration of the authentication token
   *        example:
   *          token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY2YThkMDliMmRmNjgzYzI5NmU0YWUiLCJpc19hZG1pbiI6dHJ1ZSwiaXNfYmxvY2tlZCI6ZmFsc2UsImlhdCI6MTY1MDk1ODg4MSwiZXhwIjoxNjUwOTYyNDgxfQ.4gr5m1-rQsLh-YqZsQq5f__wZzc73XL7-I1OLUK4ges
   *          duration: 1h     
   */

  .get('/', jwt.authenticateToken, driveController.getUserDocuments)
  .get('/count', jwt.authenticateToken, driveController.getCountUserDocuments)
  .get('/specific/file/:fileId', jwt.authenticateToken, driveController.getDocumentById)
  .get('/specific/file/download/:fileId', jwt.authenticateToken, driveController.downloadDocumentById)
  .delete('/specific/file/:fileId', jwt.authenticateToken, driveController.deleteDocumentById)

module.exports = router;