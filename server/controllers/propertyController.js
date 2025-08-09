const { addUserProperty, getUserProperties, getAllProperties, deleteProperty } = require('../models/propertyModel');
const { getPropertyDetailById } = require('../models/propertyDetailModel');

// Create a new property for the authenticated user
async function createProperty(req, res) {
  try {
    const userId = req.user.userId; // Get user ID from authenticated request (token)
    const propertyData = req.body; // Get property details from request body

    // Call model function to add property for the user
    const newProperty = await addUserProperty(userId, propertyData);

    // Send back the newly created property with HTTP 201 Created
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error in createProperty:', error.stack); // Log error stack trace
    res.status(500).json({ message: 'Server error' }); // Respond with server error status
  }
}

// Fetch all properties belonging to the authenticated user
async function fetchUserProperties(req, res) {
  try {
    const userId = req.user.userId; // Get user ID from authenticated request

    // Call model function to get properties for this user
    const properties = await getUserProperties(userId);

    // Respond with properties array and HTTP 200 OK
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error in fetchUserProperties:', error.stack); // Log error stack trace
    res.status(500).json({ message: 'Server error' }); // Respond with server error status
  }
}

// Fetch all properties in the system (for public or admin views)
async function fetchAllProperties(req, res) {
  try {
    // Call model function to get all properties
    const properties = await getAllProperties();

    // Respond with all properties and HTTP 200 OK
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error in fetchAllProperties:', error.stack); // Log error stack trace
    res.status(500).json({ message: 'Server error' }); // Respond with server error status
  }
}

// Get detailed info for a specific property by ID
async function getPropertyDetail(req, res){
  const { id } = req.params; // Get property ID from URL parameters
  try {
    // Call model function to get property details by ID
    const property = await getPropertyDetailById(id);

    // If no property found, respond with 404 Not Found
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Respond with property details JSON
    res.json(property);
  } catch (err) {
    console.error("Error fetching property detail:", err); // Log error
    res.status(500).json({ message: "Internal server error" }); // Respond with server error
  }
};

// Delete a property by ID (likely only allowed for property owner)
async function deleteUserProperty(req, res) {
  const { id } = req.params; // Get property ID from URL parameters

  try {
    // Call model function to delete property by ID
    const deleted = await deleteProperty(id);

    // If no property was deleted, respond with 404 Not Found
    if (!deleted) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Respond with success message
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    console.error('Error deleting property:', err); // Log error
    res.status(500).json({ message: 'Failed to delete property' }); // Respond with server error
  }
}

module.exports = {
  createProperty,
  fetchUserProperties,
  fetchAllProperties,
  getPropertyDetail,
  deleteUserProperty,
};