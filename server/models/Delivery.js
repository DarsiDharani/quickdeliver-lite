const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  pickupAddress: {
    type: String,
    required: true
  },
  dropoffAddress: {
    type: String,
    required: true
  },
  packageNote: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'In-Transit', 'Completed'],
    default: 'Pending'
  },
  itemImage: {
    type: String 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
   acceptedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Delivery', deliverySchema);
