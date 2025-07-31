// controllers/propertyController.js
const { addUserProperty, getUserProperties, getAllProperties, deleteProperty } = require('../models/propertyModel');
const { getPropertyDetailById } = require('../models/propertyDetailModel');

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

async function fetchAllProperties(req, res) {
  try {
    const properties = await getAllProperties();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error in fetchAllProperties:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getPropertyDetail(req, res){
  const { id } = req.params;
  try {
    const property = await getPropertyDetailById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error("Error fetching property detail:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function deleteUserProperty(req, res) {
  const { id } = req.params;

  try {
    const deleted = await deleteProperty(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).json({ message: 'Failed to delete property' });
  }
}

module.exports = {
  createProperty,
  fetchUserProperties,
  fetchAllProperties,
  getPropertyDetail,
  deleteUserProperty,
};
