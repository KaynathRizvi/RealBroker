const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');
const { deleteUserProperty } = require('../models/propertyModel');

// POST /api/admin/login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await adminModel.findAdminByEmail(email);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const users = await adminModel.getAllUsers();
    console.log('Fetched users:', users); // ✅ Check what’s being returned
    res.json(users);
  } catch (err) {
    console.error('Error in getUsers:', err); // ✅ Print error
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await adminModel.deleteUserById(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

const getAdminProperties = async (req, res) => {
  try {
    const properties = await adminModel.getAllWithOwnerEmail();
    res.json(properties);
  } catch (err) {
    console.error('Error in getAdminProperties:', err);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
};

async function deleteProperty(req, res) {
  try {
    const userId = req.user.id;
    const propertyId = parseInt(req.params.id);

    console.log('User ID from token:', req.user.userId);
    console.log('Property ID:', req.params.id);

    const deleted = await deleteUserProperty(userId, propertyId);
    if (!deleted) {
      console.log('Failed to delete: likely not owner or not found');
      return res.status(404).json({ message: 'Property not found or not yours' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProperty:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  login,
  getUsers,
  deleteUser,
  getAdminProperties,
  deleteProperty,
};
