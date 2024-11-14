const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.mongoDBUrl;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Routes
app.use('/api', courseRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
