const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  pickupAddress: String,
  dropoffAddress: String,
  packageNote: String,
  status: {
    type: String,
    enum: ['pending', 'claimed', 'completed'],
    default: 'pending'
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Delivery', deliverySchema);
