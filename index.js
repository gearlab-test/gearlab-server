const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/config', require('./routes/config'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/garages', require('./routes/garages'));

// MongoDB Connection Configuration
const dbOptions = {
  family: 4, // Forces IPv4 - helps fix the ECONNREFUSED DNS error
};

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI, dbOptions)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    // Use PORT from .env or default to 5000
    const PORT = process.env.PORT || 5000; 
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection error:', err.message);
    console.log('Tip: Check if your MONGO_URI in .env has the correct password instead of <db_password>');
  });