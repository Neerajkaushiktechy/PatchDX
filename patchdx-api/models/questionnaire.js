const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    formName: {
      type: String,
      trim: true,
      required: [true, 'formName is requied'],
    },
    fields: {
      type: Array,
      required: [true, 'field is requied'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  }, {
  timestamps: true,
},
);

const recordSchema = new mongoose.Schema(
  {
    questionnaireId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'questionnaire',
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'patient',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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
  }, {
  timestamps: true,
},
);

const questionnaire = mongoose.model('questionnaire', schema);
const questionnaireRecord = mongoose.model('questionnaireRecord', recordSchema);
module.exports = {
  questionnaire,
  questionnaireRecord
};
