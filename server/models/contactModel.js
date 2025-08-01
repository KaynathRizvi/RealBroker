const pool = require('../config/db');

// Save a new contact request
async function saveContactRequest({ property_id, name, agency, phone, email, message, userId }) {
  const query = `
    INSERT INTO contact_request (property_id, name, agency, phone, email, message, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  await pool.query(query, [property_id, name, agency, phone, email, message, userId]);
}

// Get contact requests for an owner with owner info included
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

// Accept a contact request
async function acceptContactRequestById(requestId, userId) {
  // Fetch owner info
  const result = await pool.query(
    'SELECT name, email, contact_number FROM user_profile WHERE user_id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('Owner profile not found');
  }

  const owner = result.rows[0];

  // Update contact request with owner info
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

// Reject (delete) a contact request
async function rejectContactRequestById(requestId) {
  await pool.query('DELETE FROM contact_request WHERE id = $1', [requestId]);
}

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
