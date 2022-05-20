const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { formatBytes } = require('../utils/sizeDocument');
const { ObjectId } = require('bson');
require('dotenv/config');

// Setup db connection for file transfers

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
    const size = formatBytes(req.file.size);
    if (!req.file || req.file === undefined || req.file.length === 0) {
      res.status(400).json({ message: "Cannot post the file" });
    } else {
      res.status(200).json({ _id: req.file.id, filename: req.file.filename, upload_date: req.file.uploadDate, size: size })
    }
  } catch (error) {
    res.status(500).json({ message: "Failure during the post file process" });
  }
};

const getDocumentById = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.fileId)) {
      const userJWT = req.user;
      const file = await gfs.files.findOne({ _id: ObjectId(req.params.fileId) })
      if (userJWT.is_admin || (userJWT._id === file.metadata.owner_id)) {
        if (!file || file === undefined || file.length === 0) {
          res.status(404).json({ message: 'File does not exist.' });
        } else {
          const size = formatBytes(file.length);
          res.send({ _id: file._id, size: size, upload_date: file.uploadDate, content_type: file.contentType, owner_id: file.metadata.owner_id })
        }
      } else {
        res.status(401).json({ message: "Cannot get the file, you must be an administrator or the owner of the file" });
      }
    } else {
      res.status(500).json({ message: "Cannot get the file" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failure fetching file informations" });
  }
};

const getDocumentByUserId = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.userId)) {
      const userJWT = req.user;
      const files = await gfs.files.find({ 'metadata.owner_id': req.params.userId }).toArray();
      if (userJWT.is_admin) {
        if (!files || files === undefined || files.length === 0) {
          res.status(404).json({ message: 'No existing files exist.' });
        } else {
          let space = 0
          const filesUpdated = files.map(obj => {
            const size = formatBytes(obj.length);
            space = space + obj.length
            return { _id: obj._id, size: size, upload_date: obj.uploadDate, filename: obj.filename, content_type: obj.contentType, owner_id: obj.metadata.owner_id };
          });
          res.send({ files: filesUpdated, total_space_used: formatBytes(space), count: files.length })
        }
      } else {
        res.status(401).json({ message: "Cannot get files, you must be an administrator" });
      }
    } else {
      res.status(500).json({ message: "Cannot get the file" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failure fetching file informations" });
  }
};

const downloadDocumentById = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.fileId)) {
      const userJWT = req.user;
      const file = await gfs.files.find({ _id: ObjectId(req.params.fileId) }).toArray();
      if (userJWT.is_admin || (userJWT._id === file[0].metadata.owner_id)) {
        var readStream = gfsBucket.openDownloadStream(ObjectId(req.params.fileId));
        readStream.on("error", (error) => {
        });
        res.setHeader('Content-Type', file[0].contentType);
        res.setHeader('Content-Disposition', 'attachment; ' + file[0].filename);
        readStream.pipe(res);
      } else {
        res.status(401).json({ message: "Cannot download the file, you must be an administrator or the owner of the file" });
      }
    } else {
      res.status(400).json({ message: "Cannot download the file" });
    }
  }
  catch (error) {
    res.status(500).json({ message: "Failure during the download process" });
  }
}

const getUserDocuments = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 0;
    // // Sort : -1 (descending) 1 (ascending)
    var sortQuery = -1;
    // Sort by element "uploadDate"
    var sortBy = "uploadDate";
    // Accept user choice for sorting
    if (req.query.sort === 'desc') {
      sortQuery = -1;
    } else if (req.query.sort === 'asc') {
      sortQuery = 1;
    }
    const userJWT = req.user;
    const files = await gfs.files.find({ 'metadata.owner_id': userJWT._id })
      .skip(offset)
      .limit(limit)
      .sort([[sortBy, sortQuery]])
      .toArray();
    if (!files || files === undefined || files.length === 0) {
      res.sendStatus(204);
    } else {
      let space = 0
      const filesUpdated = files.map(obj => {
        const size = formatBytes(obj.length);
        space = space + obj.length
        return { _id: obj._id, size: size, upload_date: obj.uploadDate, filename: obj.filename, content_type: obj.contentType, owner_id: obj.metadata.owner_id };
      });
      res.status(200).json({ files: filesUpdated, total_space_used: formatBytes(space) });
    }
  } catch (error) {
    res.status(500).json({ message: "Failure fetching user documents" });
  };
};

const getCountUserDocuments = async (req, res) => {
  try {
    const userJWT = req.user;
    const files = await gfs.files.find(({ 'metadata.owner_id': userJWT._id })).toArray();
    let size = 0
    files.map(obj => {
      size = size + obj.length
    });
    res.status(200).json({ count: files.length, total_size: formatBytes(size) });
  } catch (error) {
    res.status(500).json({ message: "Failure counting the file " });
  };
};

const deleteDocumentById = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.fileId)) {
      const userJWT = req.user;
      const file = await gfs.files.find({ _id: ObjectId(req.params.fileId) }).toArray();
      if (!file || file === undefined || file.length === 0) {
        res.status(404).json({ message: "Remove file failure, no files." });
      } else {
        if (userJWT.is_admin || (userJWT._id === file[0].metadata.owner_id)) {
          await gfsBucket.delete(ObjectId(req.params.fileId), (error) => {
            if (error) {
              res.status(404).json({ message: "Cannot remove the file" });
            } else {
              res.status(200).json({ message: "The file has been removed" });
            }
          });
        } else {
          res.status(401).json({ message: "Cannot delete file, you must be an administrator or the owner of the file" });
        }
      }
    } else {
      res.status(400).json({ message: "Bad request, An argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failure during delete file process" });
  }
};

const deleteUserDocuments = async (req, res, next) => {
  try {
    const userJWT = req.user;
    if (!userJWT.is_admin) {
      const files = await gfs.files.find({ 'metadata.owner_id': userJWT._id }).toArray();
      if (!files || files === undefined || files.length === 0) {
        next();
      } else {
        files.forEach(item => {
          gfsBucket.delete(ObjectId(item._id), (error) => {
            if (error) {
              res.status(500).json({ message: "Cannot remove files" });
            }
          });
        })
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Failure during delete files process by user" });
  }
};

const deleteUserDocumentsById = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const files = await gfs.files.find({ 'metadata.owner_id': req.params.userId }).toArray();
    if (userJWT.is_admin) {
      if (!files || files === undefined || files.length === 0) {
        next();
      } else {
        files.forEach(item => {
          gfsBucket.delete(ObjectId(item._id), (error) => {
            if (error) {
              res.status(404).json({ message: "Remove files failure. " });
            }
          });
        })
        next();
      }
    } else {
      res.status(401).json({ message: "Cannot delete file, you must be an administrator." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failure during delete file process by id" });
  }
};

module.exports = {
  postDocument, getDocumentById, getUserDocuments, deleteDocumentById, downloadDocumentById, deleteUserDocuments, getCountUserDocuments, deleteUserDocumentsById, getDocumentByUserId
};