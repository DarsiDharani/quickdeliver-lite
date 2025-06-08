const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Your User mongoose model
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Password validation
    if (!password || password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one uppercase letter." });
    }
    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one lowercase letter." });
    }
    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one number." });
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one special character." });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Remove password from response
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ user: userObj });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration." });
  }
});

// (You can add login and logout routes here as well)

module.exports = router;
