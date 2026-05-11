const express = require('express');
const router = express.Router();
const Rent = require('../models/Rent');
const Item = require('../models/Item');
const protect = require('../middleware/authMiddleware');

// GET all rented items for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const rentedItems = await Rent.find({ user: req.user.id }).populate('item');
    res.status(200).json(rentedItems);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST rent an item
router.post('/', protect, async (req, res) => {
  try {
    const { itemId } = req.body;

    // Check if already rented
    const existing = await Rent.findOne({ user: req.user.id, item: itemId, status: 'active' });
    if (existing) {
      return res.status(400).json({ message: 'Item already rented' });
    }

    // Mark item as unavailable
    await Item.findByIdAndUpdate(itemId, { isAvailable: false });

    const rent = await Rent.create({
      user: req.user.id,
      item: itemId
    });

    res.status(201).json(rent);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT return an item
router.put('/:id/return', protect, async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) return res.status(404).json({ message: 'Rent not found' });

    // Mark item as available again
    await Item.findByIdAndUpdate(rent.item, { isAvailable: true });

    rent.status = 'returned';
    await rent.save();

    res.status(200).json({ message: 'Item returned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;