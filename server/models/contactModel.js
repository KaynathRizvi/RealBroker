const pool = require('../config/db');

// Save a new contact request from a potential buyer/tenant
// Takes an object with property_id, requester details, message, and userId (requester)
// Inserts the request into contact_request table
async function saveContactRequest({ property_id, name, agency, phone, email, message, userId }) {
  const query = `
    INSERT INTO contact_request (property_id, name, agency, phone, email, message, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  await pool.query(query, [property_id, name, agency, phone, email, message, userId]);
}

// Get all contact requests for properties owned by a specific user (owner)
// Joins contact_request with user_property and user_profile to include property and owner info
// Returns an array of requests sorted by creation date descending
async function getContactRequestsForOwner(userId) {
  const result = await pool.query(
    `SELECT 
        cr.id AS request_id,
        cr.name AS requester_name,
        cr.agency,
        cr.phone AS contact_number,
        cr.email,
        cr.message,
        cr.status,
        cr.property_id,
        up.property_name,
        upf.name AS owner_name,
        upf.email AS owner_email,
        upf.contact_number AS owner_contact
     FROM 
        contact_request cr
     JOIN 
        user_property up ON cr.property_id = up.id
     JOIN 
        user_profile upf ON up.user_id = upf.user_id
     WHERE 
        up.user_id = $1
     ORDER BY 
        cr.created_at DESC`,
    [userId]
  );

  return result.rows;
}

// Accept a contact request by updating its status to 'accepted' and recording owner info
// Requires requestId and userId (owner) to fetch owner profile data
// Updates contact_request row with owner name, email, and contact number
async function acceptContactRequestById(requestId, userId) {
  // Fetch the owner's profile info
  const result = await pool.query(
    'SELECT name, email, contact_number FROM user_profile WHERE user_id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('Owner profile not found');
  }

  const owner = result.rows[0];

  // Update the contact request with acceptance and owner contact details
  await pool.query(
    `UPDATE contact_request
     SET status = 'accepted',
         owner_name = $1,
         owner_email = $2,
         owner_contact = $3
     WHERE id = $4`,
    [owner.name, owner.email, owner.contact_number, requestId]
  );
}

// Reject a contact request by deleting it from the database
// Takes the request ID and deletes the corresponding row in contact_request table
async function rejectContactRequestById(requestId) {
  await pool.query('DELETE FROM contact_request WHERE id = $1', [requestId]);
}

// Get all contact requests sent by a specific user (requester)
// Joins contact_request with user_property to include property name
// Returns an array of requests made by the user
const getSentRequestsByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT cr.*, up.property_name
     FROM contact_request cr
     JOIN user_property up ON cr.property_id = up.id
     WHERE cr.user_id = $1`,
    [userId]
  );
  return result.rows;
};

module.exports = {
  saveContactRequest,
  getContactRequestsForOwner,
  acceptContactRequestById,
  rejectContactRequestById,
  getSentRequestsByUserId,
};