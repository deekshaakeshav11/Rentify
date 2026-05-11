const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Rooms', 'Vehicles', 'Clothes', 'Books', 'Machines', 'Electronics', 'Events', 'Entertainment', 'Travel'],
    required: true
  },
  condition: {
    type: String,
    enum: ['Good', 'Better', 'Poor'],
    default: 'Good'
  },
  image: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);