const mongoose = require("mongoose");

// https://www.mongodb.com/docs/manual/core/gridfs/

const DocumentSchema = mongoose.Schema({
  // description: {
  //   type: String,
  //   required: true
  // },
  // owner_id: {
  //   type: String,
  //   required: true
  // },
  // shared_read_id: {
  //   type: Array,
  //   required: false
  // },
  // shared_write_id: {
  //   type: Array,
  //   required: false
  // },
  file: {
    type: Object,
    required: true,
  }
});

module.exports = mongoose.model('Document', DocumentSchema);