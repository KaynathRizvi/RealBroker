const bcrypt = require('bcryptjs'); // Library for hashing passwords securely
const jwt = require('jsonwebtoken'); // Library for creating and verifying JWT tokens
const { findUserByEmail, createUser } = require('../models/userModels'); // DB helper functions for user lookup and creation

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for signing JWT tokens, loaded from environment variables

// User registration handler
const register = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  try {
    // Check if a user with the same email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      // If user exists, send 400 Bad Request with appropriate message
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password with bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the email and hashed password
    const newUser = await createUser(email, hashedPassword);

    // Generate a JWT token with user ID, valid for 1 hour
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    // Send back the token with 201 Created status
    res.status(201).json({ token });

  } catch (error) {
    // Log any server errors and respond with 500 Internal Server Error
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login handler
const login = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  try {
    // Find user in database by email
    const user = await findUserByEmail(email);

    // If user not found, respond with 400 Bad Request and invalid credentials message
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare the provided password with the hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, respond with 400 Bad Request and invalid credentials message
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate a JWT token with user ID, valid for 1 hour
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Send back the token as JSON response
    res.json({ token });

  } catch (error) {
    // Log any server errors and respond with 500 Internal Server Error
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the register and login functions for use in routes
module.exports = {
  register,
  login,
};