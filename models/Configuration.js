const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  selectedOptions: [{ category: String, name: String, price: Number }],
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Configuration', configSchema);