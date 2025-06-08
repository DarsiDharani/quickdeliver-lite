const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const {
  createDelivery,
  getPendingDeliveries,
  claimDelivery,
} = require('../controllers/deliveryController');

router.post('/', authenticate, authorize('customer'), createDelivery);
router.get('/', authenticate, getPendingDeliveries);
router.post('/:id/claim', authenticate, authorize('driver'), claimDelivery);

module.exports = router;
