const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const jwt = require('../utils/jwt');
const { ObjectId } = require('bson');
require('dotenv/config');

// Setup db connection for file transfer

const dbConnectionString = process.env.DB_CONNECTION_STRING;
const dbConnection = mongoose.createConnection(dbConnectionString);

// Init gfs connection

let gfs, gfsBucket;

dbConnection.once('open', () => {
  gfs = Grid(dbConnection.db, mongoose.mongo);
  gfs.collection('documents');
  gfsBucket = new mongoose.mongo.GridFSBucket(dbConnection.db, {
    bucketName: "documents",
  });
})

const postDocument = async (req, res) => {
  try {
    if (!req.file || req.file === undefined || req.file.length === 0) {
      res.status(400).json({ message: 'File : cannot upload a file that does not exist.' });
    } else {
      res.status(200).json(req.file)
    }
  } catch (error) {
    res.status(500).json({ message: "File : cannot post file : " + error });
  }
};

const getDocumentById = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.fileId)) {
      const file = await gfs.files.findOne({ _id: ObjectId(req.params.fileId) })
      if (!file || file === undefined || file.length === 0) {
        res.status(404).json({ message: 'File : does not exist.' });
      } else {
        // res.status(200).json(file);
        console.log(file._id)
        res.send(file)
        var readStream = gfsBucket.openDownloadStream(file._id);
        readStream.on("error"), (error) => {
          console.log(error);
        }
        readStream.pipe(res);
      }
    } else {
      res.status(400).json({ message: "BSONTypeError : Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer" });
    }
  } catch (error) {
    res.status(500).json({ message: "File : cannot get file : " + error });
  }
};

const downloadDocumentById = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.fileId)) {
      const userJWT = req.user;
      const file = await gfs.files.find({ _id: ObjectId(req.params.fileId) }).toArray();
      if (userJWT.is_admin || (userJWT.owner_id === file[0].metadata.owner_id)) {
        var readStream = gfsBucket.openDownloadStream(ObjectId(req.params.fileId));
        readStream.on("error", (error) => {
          console.log(error);
        });
        readStream.pipe(res);
      } else {
        res.status(401).json({ message: "Cannot download : You must be an administrator or the owner of the file" });
      }
    } else {
      res.status(400).json({ message: "BSONTypeError : Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer" });
    }
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
}

const getUserDocuments = async (req, res) => {
  try {
    const userJWT = req.user;
    const files = await gfs.files.find({ 'metadata.owner_id': userJWT._id }).toArray();
    if (!files || files === undefined || files.length === 0) {
      res.sendStatus(204);
    } else {
      res.status(200).json(files);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File : cannot get files : " + error });
  };
};

const deleteDocumentById = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.fileId)) {
      await gfsBucket.delete(ObjectId(req.params.fileId), (error) => {
        if (error) {
          res.status(404).json({ message: "File : remove failure." });
        } else {
          res.status(200).json({ message: "File : remove success." });
        }
      });
    } else {
      res.status(400).json({ message: "BSONTypeError : Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File : cannot delete file : " + error });
  }
};

module.exports = {
  postDocument, getDocumentById, getDocumentById, getUserDocuments, deleteDocumentById, downloadDocumentById
};