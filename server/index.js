const express = require('express');
const cors = require('cors');
const path = require('path');  // <-- Add this
require('dotenv').config();

const app = express();

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

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

const propertyRoutes = require('./routes/property');
app.use('/api/property', propertyRoutes);

const subscriptionRoutes = require("./routes/subscription");
app.use("/api/subscription", subscriptionRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Serve React static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
