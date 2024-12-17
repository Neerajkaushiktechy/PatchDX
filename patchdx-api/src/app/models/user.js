import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  is_staff: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    default: Date.now,
    type: Date,
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// compare user  password
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const user = mongoose.model('user', userSchema);

module.exports = user;
