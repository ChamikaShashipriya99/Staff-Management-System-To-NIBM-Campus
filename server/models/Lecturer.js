const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lecturerId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lecturer', lecturerSchema); 