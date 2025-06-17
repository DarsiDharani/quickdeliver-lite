const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { login, register, logout } = require('../controllers/authController');
const User = require('../models/User'); 

// Register and login
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('name email role');
    res.json({ user });
  } catch (err) {
    console.error('Auth Me Error:', err);
    res.status(500).json({ error: 'Failed to load user' });
  }
});

module.exports = router;
