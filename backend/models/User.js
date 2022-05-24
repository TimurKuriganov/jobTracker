const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Your name should not be less than 2 letters'],
    maxlength: [20, 'Your name should not exceed 20 letters'],
    trim: true
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [20, 'Your lastname should not exceed 20 letters'],
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  location: {
    type: String,
    required: true,
  }
})
userSchema.methods.generateToken = function() {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME});
};
userSchema.methods.checkPassword = async function(pwd) {
  return await bcrypt.compare(pwd, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;
