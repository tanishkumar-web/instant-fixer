const mongoose = require('mongoose');

const HelperSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  services: [{
    type: String,
    required: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    maxlength: 500
  },
  experience: {
    type: Number,
    default: 0
  },
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  verified: {
    type: Boolean,
    default: false
  },
  documents: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Helper', HelperSchema);