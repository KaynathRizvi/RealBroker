const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

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

module.exports = {
  login,
  getUsers,
  deleteUser,
  getAdminProperties,
};
