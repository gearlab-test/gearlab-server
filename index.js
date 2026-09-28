const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const app = express();

// Security Headers
app.use(helmet());

// Prevent NoSQL injection (Express 5 compatible)
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  if (req.query) {
    try {
      mongoSanitize.sanitize(req.query);
    } catch (_) {}
  }
  next();
});

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

// Health Check Routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'GearLab API is running' });
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/config',   require('./routes/config'));
app.use('/api/cart',     require('./routes/cart'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/garages',  require('./routes/garages'));
app.use('/api/admin',    require('./routes/admin'));


// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ No MONGO_URI provided. Server operating in fallback/demo mode for catalog data.');
    return;
  }

  // Connect to DB with a reasonable timeout so queries don't hang indefinitely
  mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false
  })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => {
      console.warn('⚠️ MongoDB connection could not be established:', err.message);
      console.warn('ℹ️ Running in fallback mode. Vehicle catalog will remain available.');
    });
});