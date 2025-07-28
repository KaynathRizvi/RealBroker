const bcrypt = require('bcryptjs');

async function hashPassword() {
  const hashed = await bcrypt.hash('yourAdminPassword', 10);
  console.log('Hashed password:', hashed);
}

hashPassword();
