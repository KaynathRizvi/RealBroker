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
    const result = await adminModel.deleteUserById(id);

    if (!result.deleted) {
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


const getAdminProperties = async (req, res) => {
  try {
    const properties = await adminModel.getAllWithOwnerEmail();
    res.json(properties);
  } catch (err) {
    console.error('Error in getAdminProperties:', err);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
};

const deleteProperty = async(req, res) => {
  try {
    const propertyId = parseInt(req.params.id);

    console.log('Deleting property ID:', propertyId);

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

async function getAdminPropertyDetail(req, res){
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
};

module.exports = {
  login,
  getUsers,
  deleteUser,
  getAdminProperties,
  deleteProperty,
  getProfile,
  getAdminPropertyDetail,
};
