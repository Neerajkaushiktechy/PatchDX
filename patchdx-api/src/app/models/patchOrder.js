const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    groupNames: [{
      groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'allergenGroup'
      },
      groupName: {
        type: String
      },
      allergens: {
        type: [],
      },
    }],
    individualAllergens: [{
      individualId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'individualAllergen'
      },
      name: {
        type: String
      }
    }],
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
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  }, {
  timestamps: true,
},
);

const patchOrderModel = mongoose.model('patchOrder', schema);

module.exports = patchOrderModel;
