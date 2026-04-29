const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  location: { type: String },
  rating:   { type: Number, default: 4.0 },
}, { timestamps: true });

module.exports = mongoose.model('Garage', garageSchema);