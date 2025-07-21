// controllers/propertyController.js
const { addUserProperty, getUserProperties, deleteUserProperty } = require('../models/propertyModel');

async function createProperty(req, res) {
  try {
    const userId = req.user.userId; // or req.user.user_profile_id depending on your token payload
    const propertyData = req.body;

    const newProperty = await addUserProperty(userId, propertyData);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error in createProperty:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
}

async function fetchUserProperties(req, res) {
  try {
    const userId = req.user.userId;

    const properties = await getUserProperties(userId);
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error in fetchUserProperties:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteProperty(req, res) {
  try {
    const userId = req.user.userId;
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
  createProperty,
  fetchUserProperties,
  deleteProperty,
};
