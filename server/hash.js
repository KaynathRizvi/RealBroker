const bcrypt = require('bcryptjs');

// Async function to hash a plaintext password
async function hashPassword() {
  const hashed = await bcrypt.hash('yourAdminPassword', 10); // Hash the password 'yourAdminPassword' with a salt round of 10
  console.log('Hashed password:', hashed);
}

hashPassword();

// To get the hashed password, run: node hash.js
