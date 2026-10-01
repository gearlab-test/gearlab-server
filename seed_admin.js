require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB...');
    
    // Seed Admin
    const adminEmail = 'admin@gearlab.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin already exists.');
    } else {
      const hashed = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'System Administrator',
        email: adminEmail,
        password: hashed,
        role: 'admin',
        isApproved: true
      });
      console.log('✅ Admin user created: admin@gearlab.com / admin123');
    }

    // Seed Sample Approved Workshops
    const sampleWorkshops = [
      { name: 'Apex Performance Studio', email: 'apex@gearlab.com' },
      { name: 'Velocity Moto & Auto Garage', email: 'velocity@gearlab.com' },
      { name: 'GearLab Central Hub', email: 'central@gearlab.com' },
    ];

    const workshopHash = await bcrypt.hash('workshop123', 10);
    for (const ws of sampleWorkshops) {
      const exists = await User.findOne({ email: ws.email });
      if (!exists) {
        await User.create({
          name: ws.name,
          email: ws.email,
          password: workshopHash,
          role: 'workshop',
          isApproved: true
        });
        console.log(`✅ Workshop created: ${ws.name} (${ws.email} / workshop123)`);
      }
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  });
