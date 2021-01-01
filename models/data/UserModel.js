const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true, select: false},
  token: {type: String, required: true, unique: true},
  sequence_num: {type: Number, required: true, default: 0},
},
{
  timestamps: true,
  minimize: true,
  validateBeforeSave: true,
});

module.exports = mongoose.model('User', UserSchema);
