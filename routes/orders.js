const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

router.post(
  '/',
  authMiddleware,
  [
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
    body('serviceCenter').notEmpty().withMessage('Service center is required'),
    body('bookingDate').isISO8601().withMessage('Booking date must be a valid ISO8601 date'),
    body('workshopId').isMongoId().withMessage('Invalid workshop ID'),
    body('customerEmail').isEmail().withMessage('Invalid email address'),
    body('customerPhone').matches(/^\+?[0-9]{10,15}$/).withMessage('Customer phone must be a valid phone number (10-15 digits)')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { items, totalPrice, serviceCenter, bookingDate, workshopId, customerEmail, customerPhone } = req.body;
      
      const order = await Order.create({
        userId: req.userId,
        items,
        totalPrice,
        serviceCenter,
        bookingDate,
        workshopId,
        customerEmail,
        customerPhone
      });

      // Clear user's cart
      await Cart.findOneAndUpdate(
        { userId: req.userId },
        { $set: { configurations: [] } }
      );

      res.json(order);
    } catch (err) { res.status(500).json({ message: err.message }); }
  }
);

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('workshopId', 'name')
      .populate({
        path: 'items',
        populate: { path: 'vehicleId' }
      })
      .sort({ createdAt: -1 });

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
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Verify the requester is the assigned workshop
    if (order.workshopId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only the assigned workshop can update this order' });
    }
    
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;

