const mongoose = require('mongoose');


const schema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: [true, 'field is requied'],
    },
    template: {
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
  }, {
  timestamps: true,
},
);

const summarySchema = new mongoose.Schema(
  {
    summaryLetter: {
      type: Object,
      required: [true, 'field is requied'],
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'letterTemplate',
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
  }, {
  timestamps: true,
},
);

const letterTemplate = mongoose.model('letterTemplate', schema);
const summaryLetter = mongoose.model('summaryLetter', summarySchema);
module.exports = {
  letterTemplate,
  summaryLetter
};
