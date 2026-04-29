const router = require('express').Router();
const Garage = require('../models/Garage');

router.get('/', async (req, res) => {
  try {
    // Return mock data if DB is empty, otherwise return real data
    const garages = await Garage.find();
    if (garages.length === 0) {
      return res.json([
        { _id: '1', name: 'SpeedZone Garage', location: 'Bengaluru, KA', rating: 4.8 },
        { _id: '2', name: 'TurboFix Hub',     location: 'Mumbai, MH',   rating: 4.5 },
        { _id: '3', name: 'GearPro Center',   location: 'Delhi, DL',    rating: 4.3 },
      ]);
    }
    res.json(garages);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;