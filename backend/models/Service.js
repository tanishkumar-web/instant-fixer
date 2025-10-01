const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Service name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'home',
      'tech',
      'personal',
      'business',
      'health',
      'other'
    ]
  },
  basePrice: {
    type: Number,
    required: [true, 'Please add a base price']
  },
  duration: {
    type: Number,
    required: [true, 'Please add estimated duration in minutes']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', ServiceSchema);