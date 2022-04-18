const mongoose = require("mongoose");

// https://www.mongodb.com/docs/manual/core/gridfs/

const DocumentSchema = mongoose.Schema({
  file_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: true
  },
  upload_date_unix: {
    type: String,
    required: true
  },
  source_file: {
    type: Buffer,
    required: true,
  }
});

module.exports = mongoose.model('Document', DocumentSchema);