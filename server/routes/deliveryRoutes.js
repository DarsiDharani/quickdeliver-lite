
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authenticate } = require('../middleware/authMiddleware'); // Only using authenticate

const {
  createDelivery,
  getAllDeliveries,
  getPendingDeliveries,
  acceptDelivery,
  updateDeliveryStatus,
  getDeliveriesByStatus
} = require('../controllers/deliveryController');

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/deliveries'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'delivery-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Delivery Routes
router.post('/', authenticate, upload.single('itemImage'), createDelivery);
router.get('/', authenticate, getAllDeliveries);

// Driver-specific routes
router.get('/pending', authenticate, getPendingDeliveries);
router.patch('/:id/accept', authenticate, acceptDelivery);
router.patch('/:id/status', authenticate, updateDeliveryStatus);
router.get('/status/:status', authenticate, getDeliveriesByStatus);

// Error handling for file uploads
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: 'File upload error',
      error: err.message
    });
  }
  next(err);
});

module.exports = router;
