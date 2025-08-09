const jwt = require('jsonwebtoken');

// Middleware to protect routes and allow only admin users access
const protect = (req, res, next) => {
  // Extract token from Authorization header (expects format: "Bearer <token>")
  const token = req.headers.authorization?.split(' ')[1];
  
  // If no token found, respond with 401 Unauthorized
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    // Verify JWT token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded token has role 'admin', else throw error
    if (decoded.role !== 'admin') throw new Error('Not admin');

    // Attach decoded user info to request object for downstream handlers
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch {
    // If verification fails or user is not admin, respond with 403 Forbidden
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = { protect };