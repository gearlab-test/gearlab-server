const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:       { type: String, enum: ['customer', 'workshop', 'admin'], default: 'customer' },
  isApproved: { type: Boolean, default: true }, // Default true for customers, false for workshops in logic
}, { timestamps: true });





module.exports = mongoose.model('User', userSchema);