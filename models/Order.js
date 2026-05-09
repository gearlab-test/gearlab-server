const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:         [{ type: mongoose.Schema.Types.ObjectId, ref: 'Configuration' }],
  workshopId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalPrice:    { type: Number, required: true },

  serviceCenter: { type: String },
  bookingDate:   { type: Date },
  status:        { type: String, default: 'pending', enum: ['pending', 'confirmed', 'completed'] },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);