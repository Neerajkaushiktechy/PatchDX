const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  questionnaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questionnaire',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('patient', patientSchema);
