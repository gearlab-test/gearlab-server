const router = require('express').Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Middleware to check if user is admin
const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

// Get all users (for management)
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Toggle approval status
router.patch('/users/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { isApproved } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { isApproved }, { new: true });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete a user
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;

