const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to protect routes by verifying JWT token
const protect = (req, res, next) => {
  // Get the Authorization header value (expected format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  // Extract token from the header if it exists
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, respond with 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // Verify the token using the JWT secret key
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // If token verification fails (invalid or expired), respond with 401 Unauthorized
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    // Attach decoded user info (e.g., userId) to the request object for downstream use
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
  });
};

// Alias for 'protect' middleware for subscription routes (same functionality, different naming)
const authenticateToken = protect;

module.exports = { 
  protect,           // Use this for general route protection
  authenticateToken  // Use this specifically for subscription-related routes
};