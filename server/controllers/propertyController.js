// controllers/propertyController.js
const { addUserProperty, getUserProperties } = require('../models/propertyModel');

async function createProperty(req, res) {
  try {
    const userId = req.user.id; // or req.user.user_profile_id depending on your token payload
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
    const userId = req.user.id;

    const properties = await getUserProperties(userId);
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error in fetchUserProperties:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createProperty,
  fetchUserProperties,
};
