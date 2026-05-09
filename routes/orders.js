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
    const orders = await Order.find({ userId: req.userId }).populate({
      path: 'items',
      populate: { path: 'vehicleId' }
    });

    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Workshop: Get All Orders
router.get('/workshop', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate({
        path: 'items',
        populate: { path: 'vehicleId' }
      })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Workshop: Update Order Status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;

