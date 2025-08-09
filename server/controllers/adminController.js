const bcrypt = require('bcryptjs'); // Library to hash and compare passwords securely
const jwt = require('jsonwebtoken'); // Library to create and verify JSON Web Tokens for authentication
const adminModel = require('../models/adminModel'); // Import admin-related database operations

// POST /api/admin/login
// Handles admin login, verifies credentials and returns JWT token if successful
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin user by email
    const user = await adminModel.findAdminByEmail(email);

    // Check if user exists and has admin role
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT token containing user ID and role, expires in 1 day
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with token and user data
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/admin/users
// Fetches all users from the database
const getUsers = async (req, res) => {
  try {
    const users = await adminModel.getAllUsers();
    console.log('Fetched users:', users); // Log for debugging
    res.json(users);
  } catch (err) {
    console.error('Error in getUsers:', err); // Log error details
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// DELETE /api/admin/users/:id
// Deletes a user by ID, with checks for existence and admin protection
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await adminModel.deleteUserById(id);

    if (!result.deleted) {
      // Handle specific failure reasons
      if (result.reason === 'not_found') {
        return res.status(404).json({ message: 'User not found' });
      }
      if (result.reason === 'cannot_delete_admin') {
        return res.status(403).json({ message: 'Admins cannot be deleted' });
      }
      return res.status(400).json({ message: 'Failed to delete user' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/admin/properties
// Retrieves all properties with owner email details
const getAdminProperties = async (req, res) => {
  try {
    const properties = await adminModel.getAllWithOwnerEmail();
    res.json(properties);
  } catch (err) {
    console.error('Error in getAdminProperties:', err);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
};

// DELETE /api/admin/properties/:id
// Deletes a property by ID
const deleteProperty = async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id);

    console.log('Deleting property ID:', propertyId); // Log deletion attempt

    const deleted = await adminModel.deleteUserProperty(propertyId);
    if (!deleted) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProperty:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/admin/profile/:id
// Retrieves profile information of a user by ID
const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await adminModel.getProfileById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/admin/property/:id
// Retrieves detailed information about a specific property by ID
async function getAdminPropertyDetail(req, res) {
  const { id } = req.params;
  try {
    const property = await adminModel.getAdminPropertyDetailById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error("Error fetching property detail:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  login,
  getUsers,
  deleteUser,
  getAdminProperties,
  deleteProperty,
  getProfile,
  getAdminPropertyDetail,
};