const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.post(
  '/',
  authMiddleware,
  [
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
    body('serviceCenter').optional().isString(),
    body('bookingDate').optional(),
    body('workshopId').optional(),
    body('customerEmail').isEmail().withMessage('Valid email address is required'),
    body('customerPhone').notEmpty().withMessage('Customer phone number is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array().map(e => e.msg).join(', ');
      return res.status(400).json({ errors: errors.array(), message: errorMsg });
    }

    try {
      let { items, totalPrice, serviceCenter, bookingDate, workshopId, customerEmail, customerPhone } = req.body;
      
      // Fallback for workshop if not explicitly provided or invalid
      if (!workshopId) {
        const defaultWorkshop = await User.findOne({ role: 'workshop', isApproved: true });
        if (defaultWorkshop) {
          workshopId = defaultWorkshop._id;
        } else {
          const admin = await User.findOne({ role: 'admin' });
          workshopId = admin?._id || req.userId;
        }
      }

      if (!serviceCenter && workshopId) {
        const ws = await User.findById(workshopId);
        serviceCenter = ws?.name || 'GearLab Certified Center';
      }
      
      const order = await Order.create({
        userId: req.userId,
        items,
        totalPrice,
        serviceCenter: serviceCenter || 'GearLab Certified Center',
        bookingDate: bookingDate ? new Date(bookingDate) : new Date(Date.now() + 86400000),
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
    } catch (err) { 
      res.status(500).json({ message: err.message }); 
    }
  }
);

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('workshopId', 'name email')
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
      .populate('userId', 'name email phone')
      .populate({
        path: 'items',
        populate: { path: 'vehicleId' }
      })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get Single Order by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('workshopId', 'name email')
      .populate({
        path: 'items',
        populate: { path: 'vehicleId' }
      });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
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
    
    // Verify the requester is the assigned workshop or admin
    if (order.workshopId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Only the assigned workshop can update this order' });
    }
    
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;