const { Pool } = require('pg'); // Import Pool class from 'pg' module to manage PostgreSQL connections

// Create a new pool instance to handle multiple client connections to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use database connection string from environment variables
  ssl: {
    rejectUnauthorized: false, // Disable SSL certificate verification (useful for some managed DBs like Heroku)
  },
});

module.exports = pool; // Export the pool instance for use in other parts of the application