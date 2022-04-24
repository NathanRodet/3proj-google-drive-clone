const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
require('dotenv/config');
const dbConnectionString = process.env.DB_CONNECTION_STRING;

const storage = new GridFsStorage({
  url: dbConnectionString,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'documents'
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage })

module.exports = { upload }