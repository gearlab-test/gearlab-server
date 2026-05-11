const router = require('express').Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice, serviceCenter, bookingDate, workshopId, customerEmail, customerPhone } = req.body;
    if (!workshopId) return res.status(400).json({ message: 'Workshop selection is required' });
    
    const order = await Order.create({
      userId: req.userId, items, totalPrice, serviceCenter, bookingDate, workshopId, customerEmail, customerPhone
    });

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $set: { configurations: [] } }
    );

    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('workshopId', 'name')
      .populate({
        path: 'items',
        populate: { path: 'vehicleId' }
      });

    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Workshop: Get All Orders assigned to THIS workshop
router.get('/workshop', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ workshopId: req.userId })
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

