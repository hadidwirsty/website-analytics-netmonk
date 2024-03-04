const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  teamName: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: [String]
});

module.exports = mongoose.model('User', userSchema);
