const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('❌ No token found');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Must contain _id and role
    next();
  } catch (err) {
    console.log('❌ Invalid token');
    res.clearCookie('token');
    return res.status(401).json({ error: 'Invalid token' });
  }
};
