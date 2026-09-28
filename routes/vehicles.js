const router = require('express').Router();
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const fallbackVehicles = require('../data/fallbackVehicles');

router.get('/', async (req, res) => {
  const { type } = req.query; // ?type=bike or ?type=car
  const filter = type ? { type } : {};

  // If connected to MongoDB, attempt to fetch from database
  if (mongoose.connection.readyState === 1) {
    try {
      const vehicles = await Vehicle.find(filter).maxTimeMS(2000);
      if (vehicles && vehicles.length > 0) {
        return res.json(vehicles);
      }
    } catch (err) {
      console.warn('⚠️ MongoDB query failed, using fallback vehicles:', err.message);
    }
  }

  // Graceful fallback: return built-in vehicle catalog
  const filtered = type
    ? fallbackVehicles.filter(v => v.type === type)
    : fallbackVehicles;
  res.json(filtered);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // If connected to MongoDB, attempt to fetch from database
  if (mongoose.connection.readyState === 1) {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const vehicle = await Vehicle.findById(id).maxTimeMS(2000);
        if (vehicle) return res.json(vehicle);
      }
    } catch (err) {
      console.warn('⚠️ MongoDB findById failed, checking fallback:', err.message);
    }
  }

  // Graceful fallback: check built-in catalog
  const fallback = fallbackVehicles.find(v => v._id === id || String(v._id) === String(id));
  if (fallback) return res.json(fallback);

  res.status(404).json({ message: 'Vehicle not found' });
});

module.exports = router;