const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { createDelivery, getPendingDeliveries } = require('../controllers/deliveryController');

router.post('/', authenticate, authorize('customer'), createDelivery);
router.get('/', authenticate, getPendingDeliveries);

module.exports = router;
