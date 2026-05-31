const router = require('express').Router();
const Configuration = require('../models/Configuration');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { vehicleId, selectedOptions, totalPrice } = req.body;
    const config = await Configuration.create({
      userId: req.userId, vehicleId, selectedOptions, totalPrice
    });
    res.json(config);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    if (req.userId !== req.params.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const configs = await Configuration.find({ userId: req.params.userId }).populate('vehicleId');
    res.json(configs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;