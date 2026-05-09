require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB...');
    
    const email = 'admin@gearlab.com';
    const existing = await User.findOne({ email });
    
    if (existing) {
      console.log('Admin already exists.');
    } else {
      const hashed = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'System Administrator',
        email: email,
        password: hashed,
        role: 'admin',
        isApproved: true
      });
      console.log('✅ Admin user created: admin@gearlab.com / admin123');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  });
