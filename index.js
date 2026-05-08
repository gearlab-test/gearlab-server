const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── Replace your old app.use(cors()) with this ──
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://gearlab-client.vercel.app',
    /\.vercel\.app$/        // covers all preview URLs too
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/config',   require('./routes/config'));
app.use('/api/cart',     require('./routes/cart'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/garages',  require('./routes/garages'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Connect to DB after starting server to avoid Render boot timeout
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ DB connection error:', err));
});