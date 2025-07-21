const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8081"],
  credentials: true,
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/property', propertyRoutes);

const subscriptionRoutes = require("./routes/subscriptionRoutes")
app.use("/api/subscription", subscriptionRoutes)

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
