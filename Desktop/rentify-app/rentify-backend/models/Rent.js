const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'returned'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Rent', rentSchema);