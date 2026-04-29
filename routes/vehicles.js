const router = require('express').Router();
const Vehicle = require('../models/Vehicle');

router.get('/', async (req, res) => {
  try {
    const { type } = req.query; // ?type=bike or ?type=car
    const filter = type ? { type } : {};
    const vehicles = await Vehicle.find(filter);
    res.json(vehicles);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Not found' });
    res.json(vehicle);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;