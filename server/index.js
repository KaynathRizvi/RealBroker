const express = require('express');
const cors = require('cors');
const path = require('path');  // <-- For serving static files
require('dotenv').config();

const app = express();

// Enable CORS with specific allowed origins and credentials support
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:8081", 
    "http://localhost:5173",
    "https://realbroker.onrender.com",
    "https://realbroker-admin.onrender.com",
  ],
  credentials: true,
}));

// Parse incoming JSON requests
app.use(express.json());

// Import and use authentication routes under /api/auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Import and use user profile routes under /api/profile
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

// Import and use property routes under /api/property
const propertyRoutes = require('./routes/property');
app.use('/api/property', propertyRoutes);

// Import and use subscription routes under /api/subscription
const subscriptionRoutes = require("./routes/subscription");
app.use("/api/subscription", subscriptionRoutes);

// Import and use admin routes under /api/admin
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Import and use contact request routes under /api/request-contact
const contactRoutes = require('./routes/contact');
app.use('/api/request-contact', contactRoutes);

// Import and use statistics routes under /api/stats
const statsRoutes = require('./routes/stats');
app.use('/api/stats', statsRoutes);

// Basic root route to verify API is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Serve React static files from the build directory for frontend hosting
app.use(express.static(path.join(__dirname, 'build')));

// Start the server on the specified port (default 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));