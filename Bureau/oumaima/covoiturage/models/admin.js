const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Admin Schema
const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

const Admin = module.exports = mongoose.model('Admin', UserSchema);

