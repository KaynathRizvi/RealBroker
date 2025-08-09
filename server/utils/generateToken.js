const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Secret key for signing the JWT, stored in environment variables

// Generate a JWT token containing the userId payload, expires in 1 hour
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken; // Export the function for use elsewhere