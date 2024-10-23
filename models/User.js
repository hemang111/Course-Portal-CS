const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  registeredcourses: {
    type: Array,
    default: []
  },
  availablecourses: {
    type: Array,
    default: []
  }
}, { collection: 'data' });

const User = mongoose.model('user', userSchema);
module.exports = User;
