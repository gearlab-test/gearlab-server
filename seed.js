require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB...');

    await Vehicle.deleteMany();
    console.log('Cleared old vehicles...');

    await Vehicle.insertMany([
      {
        name: 'Royal Enfield Meteor 350',
        type: 'bike',
        basePrice: 195000,
        images: ['https://imgd.aeplcdn.com/600x337/n/cw/ec/43482/meteor-350-right-front-three-quarter.jpeg'],
        availableOptions: [
          { category: 'color',      name: 'Fireball Red',          price: 0     },
          { category: 'color',      name: 'Supernova Blue',         price: 0     },
          { category: 'exhaust',    name: 'Stock Exhaust',          price: 0     },
          { category: 'exhaust',    name: 'Performance Exhaust',    price: 12000 },
          { category: 'accessories', name: 'Touring Windscreen',   price: 4500  },
          { category: 'accessories', name: 'Saddlebags',           price: 7000  },
        ]
      },
      {
        name: 'KTM Duke 390',
        type: 'bike',
        basePrice: 310000,
        images: ['https://imgd.aeplcdn.com/600x337/n/cw/ec/1217281/duke-390-right-front-three-quarter.jpeg'],
        availableOptions: [
          { category: 'color',   name: 'Orange',              price: 0     },
          { category: 'color',   name: 'Black',               price: 0     },
          { category: 'exhaust', name: 'Akrapovic Slip-On',   price: 22000 },
          { category: 'exhaust', name: 'Stock Exhaust',       price: 0     },
          { category: 'tyres',   name: 'MRF Stock Tyres',     price: 0     },
          { category: 'tyres',   name: 'Pirelli Angel GT',    price: 9000  },
        ]
      },
      {
        name: 'Maruti Swift',
        type: 'car',
        basePrice: 600000,
        images: ['https://imgd.aeplcdn.com/600x337/n/cw/ec/159669/swift-exterior-right-front-three-quarter-2.jpeg'],
        availableOptions: [
          { category: 'color',   name: 'Pearl White',          price: 0     },
          { category: 'color',   name: 'Metallic Grey',        price: 5000  },
          { category: 'spoiler', name: 'Rear Spoiler',         price: 8000  },
          { category: 'alloys',  name: 'Diamond Cut Alloys',   price: 15000 },
          { category: 'sunroof', name: 'Panoramic Sunroof',    price: 35000 },
        ]
      },
      {
        name: 'Hyundai Creta',
        type: 'car',
        basePrice: 1100000,
        images: ['https://imgd.aeplcdn.com/600x337/n/cw/ec/41197/creta-exterior-right-front-three-quarter-3.jpeg'],
        availableOptions: [
          { category: 'color',    name: 'Typhoon Silver',      price: 0     },
          { category: 'color',    name: 'Starry Night Black',  price: 5000  },
          { category: 'alloys',   name: '17-inch Alloys',      price: 18000 },
          { category: 'sunroof',  name: 'Electric Sunroof',    price: 45000 },
          { category: 'wrapping', name: 'Matte Black Wrap',    price: 30000 },
        ]
      },
    ]);

    console.log('✅ 4 vehicles seeded successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  });