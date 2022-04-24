const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { ObjectId } = require('bson');
require('dotenv/config');

// Setup db connection for file transfer

const dbConnectionString = process.env.DB_CONNECTION_STRING;
const dbConnection = mongoose.createConnection(dbConnectionString);

// Init gfs connection

let gfs;

dbConnection.once('open', () => {
  gfs = Grid(dbConnection.db, mongoose.mongo);
  gfs.collection('documents');
})

const postDocument = async (req, res) => {
  try {
    res.json({ file: req.file })
  } catch (error) {
    res.status(500).json({ message: "File : cannot post file : " + error });
  }
};

const getDocument = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: ObjectId(req.params.filename) })
    if (!file || file === undefined || file.length === 0) {
      res.status(404).json({ message: 'File : does not exist.' });
    } else {
      res.status(200).json(file);
    }
  } catch (error) {
    res.status(500).json({ message: "File : cannot get file : " + error });
  }
};

const getDocuments = async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
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

const deleteDocument = async (req, res) => {
  try {
    gridfsBucket = new mongoose.mongo.GridFSBucket(dbConnection.db, {
      bucketName: "documents",
    });
    await gridfsBucket.delete(ObjectId(req.params.fileId), (error) => {
      if (error) {
        res.status(404).json({ message: "File : remove failure." });
      } else {
        res.status(200).json({ message: "File : remove success." });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File : cannot delete file : " + error });
  }
};

module.exports = {
  postDocument, getDocument, getDocuments, deleteDocument
};