require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB...');
    
    const keepEmails = [
      'admin@gearlab.com',
      'test@example.com',
      'authorized@example.com',
      'titan@example.com'
    ];

    const result = await User.deleteMany({ email: { $nin: keepEmails } });
    console.log(`✅ Deleted ${result.deletedCount} temporary users.`);
    
    // Also list remaining users to confirm
    const remaining = await User.find().select('name email role');
    console.log('Remaining Users:', remaining);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Cleanup error:', err.message);
    process.exit(1);
  });
