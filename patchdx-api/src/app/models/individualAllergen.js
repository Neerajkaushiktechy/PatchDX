const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    variableName: {
      type: String,
      trim: true,
    },
    displayName: {
      type: String,
    },
  },
);

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
    },
    variableName: {
      type: [],
    },
    displayName: {
      type: [],
    },
  },
);

const individualAllergen = mongoose.model('individualAllergen', schema);
const allergenGroup = mongoose.model('allergenGroup', groupSchema);

module.exports = {
  individualAllergen,
  allergenGroup,
};
