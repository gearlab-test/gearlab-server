const router = require('express').Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice, serviceCenter, bookingDate } = req.body;
    const order = await Order.create({
      userId: req.userId, items, totalPrice, serviceCenter, bookingDate
    });
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).populate('items');
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;