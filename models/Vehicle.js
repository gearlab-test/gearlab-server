const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  type:      { type: String, enum: ['bike', 'car'], required: true },
  basePrice: { type: Number, required: true },
  images:    [String],
  availableOptions: [{
    category: String,      // e.g. "color", "exhaust", "spoiler"
    name:     String,      // e.g. "Matte Black"
    price:    Number,
    imageUrl: String,
  }]
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);