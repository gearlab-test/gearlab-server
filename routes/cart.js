const router = require('express').Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate({
      path: 'configurations', populate: { path: 'vehicleId' }
    });
    res.json(cart || { configurations: [] });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { configId } = req.body;
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) cart = await Cart.create({ userId: req.userId, configurations: [] });
    cart.configurations.push(configId);
    await cart.save();
    res.json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    cart.configurations = cart.configurations.filter(c => c.toString() !== req.params.id);
    await cart.save();
    res.json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;