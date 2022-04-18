const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false,
  }
});

module.exports = mongoose.model('User', UserSchema);