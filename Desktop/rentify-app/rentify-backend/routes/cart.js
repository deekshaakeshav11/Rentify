const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const protect = require('../middleware/authMiddleware');

// GET all cart items for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate('item');
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST add item to cart
router.post('/', protect, async (req, res) => {
  try {
    const { itemId } = req.body;

    // Check if item already in cart
    const existing = await Cart.findOne({ user: req.user.id, item: itemId });
    if (existing) {
      return res.status(400).json({ message: 'Item already in cart' });
    }

    const cartItem = await Cart.create({
      user: req.user.id,
      item: itemId
    });

    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE remove item from cart
router.delete('/:id', protect, async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    if (cartItem.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await cartItem.deleteOne();
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;