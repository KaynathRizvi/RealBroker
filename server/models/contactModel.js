const pool = require('../config/db'); // or adjust path

// Save a new contact request
async function saveContactRequest({ property_id, name, agency, phone, email, message }) {
  const query = `
    INSERT INTO contact_request (property_id, name, agency, phone, email, message)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  await pool.query(query, [property_id, name, agency, phone, email, message]);
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

// Accept a contact request and update owner info (frontend must send owner info)
async function acceptContactRequest({ requestId, ownerName, ownerEmail, ownerContact }) {
  await pool.query(`
    UPDATE contact_request
    SET status = 'accepted',
        owner_name = $1,
        owner_email = $2,
        owner_contact = $3
    WHERE id = $4
  `, [ownerName, ownerEmail, ownerContact, requestId]);
}

// Reject (delete) a contact request
async function rejectContactRequest(requestId) {
  await pool.query('DELETE FROM contact_request WHERE id = $1', [requestId]);
}

module.exports = {
  saveContactRequest,
  getContactRequestsForOwner,
  acceptContactRequest,
  rejectContactRequest,
};
