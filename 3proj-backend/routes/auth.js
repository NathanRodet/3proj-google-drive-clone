var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');

// Path : /auth

router.post('/', authController.authLogin);

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

module.exports = router;