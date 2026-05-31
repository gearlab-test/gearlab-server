const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const app = express();

// Security Headers
app.use(helmet());

// Prevent NoSQL injection
app.use(mongoSanitize());

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://gearlab-client.vercel.app',
    /^https:\/\/gearlab-client(-[a-z0-9-]+)?\.vercel\.app$/
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
app.use('/api/admin',    require('./routes/admin'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Connect to DB after starting server to avoid Render boot timeout
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ DB connection error:', err));
});