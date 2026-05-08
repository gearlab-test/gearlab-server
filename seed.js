require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB...');
    await Vehicle.deleteMany();
    console.log('Cleared old vehicles...');

    await Vehicle.insertMany([

      // ─────────────── BIKES ───────────────

      {
        name: 'Royal Enfield Meteor 350',
        type: 'bike',
        basePrice: 195000,
        images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Fireball Red',            price: 0     },
          { category: 'color',       name: 'Supernova Blue',           price: 0     },
          { category: 'color',       name: 'Stellar Black',            price: 0     },
          { category: 'exhaust',     name: 'Stock Exhaust',            price: 0     },
          { category: 'exhaust',     name: 'Rynox Performance Exhaust',price: 14000 },
          { category: 'exhaust',     name: 'Arrow Full System',        price: 28000 },
          { category: 'accessories', name: 'Touring Windscreen',       price: 4500  },
          { category: 'accessories', name: 'Leather Saddlebags',       price: 7000  },
          { category: 'accessories', name: 'Crash Guard',              price: 3200  },
          { category: 'accessories', name: 'USB Charging Port',        price: 1200  },
          { category: 'accessories', name: 'Tank Bag',                 price: 2800  },
          { category: 'tyres',       name: 'MRF Zapper Stock',         price: 0     },
          { category: 'tyres',       name: 'Michelin Road 5',          price: 8500  },
          { category: 'tyres',       name: 'Pirelli Phantom',          price: 9200  },
          { category: 'wrapping',    name: 'Matte Black Wrap',         price: 12000 },
          { category: 'wrapping',    name: 'Gloss Carbon Fiber Wrap',  price: 16000 },
        ]
      },

      {
        name: 'KTM Duke 390',
        type: 'bike',
        basePrice: 310000,
        images: ['https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'KTM Orange',               price: 0     },
          { category: 'color',       name: 'Ceramic White',            price: 0     },
          { category: 'color',       name: 'Ebony Black',              price: 0     },
          { category: 'exhaust',     name: 'Stock Exhaust',            price: 0     },
          { category: 'exhaust',     name: 'Akrapovic Slip-On',        price: 22000 },
          { category: 'exhaust',     name: 'SC Project Full System',   price: 38000 },
          { category: 'accessories', name: 'Tail Tidy Kit',            price: 2500  },
          { category: 'accessories', name: 'Bar End Mirrors',          price: 1800  },
          { category: 'accessories', name: 'Radiator Guard',           price: 2200  },
          { category: 'accessories', name: 'Frame Sliders',            price: 3500  },
          { category: 'accessories', name: 'Tank Pad',                 price: 900   },
          { category: 'tyres',       name: 'MRF Stock Tyres',          price: 0     },
          { category: 'tyres',       name: 'Pirelli Angel GT',         price: 9000  },
          { category: 'tyres',       name: 'Michelin Power GP',        price: 11000 },
          { category: 'wrapping',    name: 'Matte Orange Wrap',        price: 13000 },
          { category: 'wrapping',    name: 'Sticker Kit - Superduke',  price: 4500  },
        ]
      },

      {
        name: 'Bajaj Pulsar NS200',
        type: 'bike',
        basePrice: 148000,
        images: ['https://images.unsplash.com/photo-1609630875171-b132115ee30a?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Fiery Orange',             price: 0     },
          { category: 'color',       name: 'Midnight Black',           price: 0     },
          { category: 'color',       name: 'Pewter Grey',              price: 0     },
          { category: 'exhaust',     name: 'Stock Exhaust',            price: 0     },
          { category: 'exhaust',     name: 'Mivv Urban Steel',         price: 11000 },
          { category: 'exhaust',     name: 'Yoshimura Alpha T',        price: 17000 },
          { category: 'accessories', name: 'Fairing Kit',              price: 5500  },
          { category: 'accessories', name: 'LED Headlight Upgrade',    price: 3200  },
          { category: 'accessories', name: 'Knuckle Guards',           price: 1400  },
          { category: 'accessories', name: 'Seat Cover - Racing',      price: 1100  },
          { category: 'accessories', name: 'Engine Kill Switch Guard', price: 600   },
          { category: 'tyres',       name: 'MRF Zapper Stock',         price: 0     },
          { category: 'tyres',       name: 'CEAT Zoom Cruz',           price: 5500  },
          { category: 'wrapping',    name: 'Matte Grey Wrap',          price: 10000 },
          { category: 'wrapping',    name: 'Racing Stripes Decal',     price: 3000  },
        ]
      },

      {
        name: 'Honda CB350 H\'ness',
        type: 'bike',
        basePrice: 210000,
        images: ['https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Pearl Igneous Black',      price: 0     },
          { category: 'color',       name: 'Precious Red Metallic',    price: 0     },
          { category: 'color',       name: 'Athletic Blue Metallic',   price: 0     },
          { category: 'exhaust',     name: 'Stock Exhaust',            price: 0     },
          { category: 'exhaust',     name: 'Beowulf Short Silencer',   price: 12000 },
          { category: 'exhaust',     name: 'Cobra Drag Pipe',          price: 19000 },
          { category: 'accessories', name: 'Chrome Headlight Visor',   price: 2800  },
          { category: 'accessories', name: 'Handlebar Risers',         price: 1600  },
          { category: 'accessories', name: 'Saree Guard Chrome',       price: 900   },
          { category: 'accessories', name: 'Rear Carrier Rack',        price: 2200  },
          { category: 'accessories', name: 'Leg Guards',               price: 3100  },
          { category: 'tyres',       name: 'Ceat Zoom Cruz Stock',     price: 0     },
          { category: 'tyres',       name: 'Michelin Road Classic',    price: 8800  },
          { category: 'wrapping',    name: 'Cafe Racer Brown Wrap',    price: 14000 },
          { category: 'wrapping',    name: 'Gloss Black Wrap',         price: 11000 },
        ]
      },

      {
        name: 'TVS Apache RTR 200 4V',
        type: 'bike',
        basePrice: 143000,
        images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Knight Black',             price: 0     },
          { category: 'color',       name: 'Pearl White',              price: 0     },
          { category: 'color',       name: 'Racing Red',               price: 0     },
          { category: 'exhaust',     name: 'Stock Exhaust',            price: 0     },
          { category: 'exhaust',     name: 'Endurance Full Exhaust',   price: 13000 },
          { category: 'accessories', name: 'Belly Pan Fairing',        price: 4200  },
          { category: 'accessories', name: 'GPS Mount',                price: 800   },
          { category: 'accessories', name: 'Hugger Mudguard',          price: 1500  },
          { category: 'accessories', name: 'LED Turn Signals',         price: 1800  },
          { category: 'accessories', name: 'Paddock Stand',            price: 2400  },
          { category: 'tyres',       name: 'TVS Remora Stock',         price: 0     },
          { category: 'tyres',       name: 'Apollo Actizip R',         price: 5200  },
          { category: 'wrapping',    name: 'Matte Red Wrap',           price: 10500 },
          { category: 'wrapping',    name: 'Carbon Fiber Hood Wrap',   price: 7000  },
        ]
      },

      // ─────────────── CARS ───────────────

      {
        name: 'Maruti Swift',
        type: 'car',
        basePrice: 600000,
        images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Pearl White',              price: 0     },
          { category: 'color',       name: 'Metallic Grey',            price: 5000  },
          { category: 'color',       name: 'Magma Red',                price: 5000  },
          { category: 'spoiler',     name: 'No Spoiler',               price: 0     },
          { category: 'spoiler',     name: 'OEM Rear Spoiler',         price: 8000  },
          { category: 'spoiler',     name: 'GT Wing Spoiler',          price: 14000 },
          { category: 'alloys',      name: 'Stock Steel Wheels',       price: 0     },
          { category: 'alloys',      name: 'Diamond Cut 15" Alloys',   price: 15000 },
          { category: 'alloys',      name: 'BBS Style 16" Alloys',     price: 28000 },
          { category: 'sunroof',     name: 'No Sunroof',               price: 0     },
          { category: 'sunroof',     name: 'Aftermarket Sunroof',      price: 35000 },
          { category: 'accessories', name: 'Roof Rails',               price: 6500  },
          { category: 'accessories', name: 'Body Side Moulding',       price: 3200  },
          { category: 'accessories', name: 'Seat Covers - Sport',      price: 4500  },
          { category: 'accessories', name: 'Android Auto Upgrade',     price: 8000  },
          { category: 'wrapping',    name: 'Matte Black Wrap',         price: 45000 },
          { category: 'wrapping',    name: 'Gloss White Wrap',         price: 40000 },
        ]
      },

      {
        name: 'Hyundai Creta',
        type: 'car',
        basePrice: 1100000,
        images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Typhoon Silver',           price: 0     },
          { category: 'color',       name: 'Starry Night Black',       price: 5000  },
          { category: 'color',       name: 'Dazzling Red',             price: 5000  },
          { category: 'color',       name: 'Atlas White',              price: 0     },
          { category: 'alloys',      name: '17" Stock Alloys',         price: 0     },
          { category: 'alloys',      name: '18" Diamond Cut Alloys',   price: 22000 },
          { category: 'sunroof',     name: 'No Sunroof',               price: 0     },
          { category: 'sunroof',     name: 'Electric Panoramic Sunroof',price: 45000},
          { category: 'accessories', name: 'Dashcam Front + Rear',     price: 7500  },
          { category: 'accessories', name: 'All Weather Floor Mats',   price: 3800  },
          { category: 'accessories', name: 'Wireless Charger Pad',     price: 4200  },
          { category: 'accessories', name: 'Roof Rails + Crossbars',   price: 8500  },
          { category: 'accessories', name: 'Ambient Lighting Kit',     price: 6000  },
          { category: 'wrapping',    name: 'Matte Grey Wrap',          price: 55000 },
          { category: 'wrapping',    name: 'Two-Tone Roof Wrap',       price: 18000 },
        ]
      },

      {
        name: 'Tata Nexon',
        type: 'car',
        basePrice: 850000,
        images: ['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Flame Red',                price: 0     },
          { category: 'color',       name: 'Daytona Grey',             price: 5000  },
          { category: 'color',       name: 'Pristine White',           price: 0     },
          { category: 'color',       name: 'Midnight Black',           price: 5000  },
          { category: 'alloys',      name: '16" Stock Alloys',         price: 0     },
          { category: 'alloys',      name: '17" Gloss Black Alloys',   price: 18000 },
          { category: 'sunroof',     name: 'No Sunroof',               price: 0     },
          { category: 'sunroof',     name: 'Single Pane Sunroof',      price: 32000 },
          { category: 'accessories', name: 'Skid Plates Front+Rear',   price: 9000  },
          { category: 'accessories', name: 'Side Steps',               price: 7500  },
          { category: 'accessories', name: 'Roof Spoiler',             price: 5500  },
          { category: 'accessories', name: 'Rear Parking Camera',      price: 6000  },
          { category: 'accessories', name: 'Seat Back Protectors',     price: 2200  },
          { category: 'wrapping',    name: 'Matte Black Wrap',         price: 48000 },
          { category: 'wrapping',    name: 'Army Green Wrap',          price: 52000 },
        ]
      },

      {
        name: 'Mahindra Scorpio-N',
        type: 'car',
        basePrice: 1350000,
        images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Dazzling Silver',          price: 0     },
          { category: 'color',       name: 'Deep Forest',              price: 5000  },
          { category: 'color',       name: 'Royal Gold',               price: 8000  },
          { category: 'color',       name: 'Everest White',            price: 0     },
          { category: 'alloys',      name: '18" Stock Alloys',         price: 0     },
          { category: 'alloys',      name: '20" Off-Road Alloys',      price: 35000 },
          { category: 'tyres',       name: 'Stock MRF Tyres',          price: 0     },
          { category: 'tyres',       name: 'BF Goodrich All-Terrain',  price: 42000 },
          { category: 'tyres',       name: 'Michelin LTX Force',       price: 38000 },
          { category: 'accessories', name: 'Bull Bar',                 price: 18000 },
          { category: 'accessories', name: 'Roof Rack',                price: 14000 },
          { category: 'accessories', name: 'Side Steps Nerf Bar',      price: 11000 },
          { category: 'accessories', name: 'LED Light Bar',            price: 9500  },
          { category: 'accessories', name: 'Snorkel Kit',              price: 22000 },
          { category: 'accessories', name: 'Tow Hook Cover',           price: 1500  },
          { category: 'wrapping',    name: 'Army Green Wrap',          price: 65000 },
          { category: 'wrapping',    name: 'Matte Black Wrap',         price: 60000 },
          { category: 'wrapping',    name: 'Camo Pattern Wrap',        price: 72000 },
        ]
      },

      {
        name: 'Honda City',
        type: 'car',
        basePrice: 1200000,
        images: ['https://images.unsplash.com/photo-1590362891125-f07efd90eec9?auto=format&fit=crop&q=80&w=800'],
        availableOptions: [
          { category: 'color',       name: 'Lunar Silver Metallic',    price: 0     },
          { category: 'color',       name: 'Radiant Red Metallic',     price: 5000  },
          { category: 'color',       name: 'Obsidian Blue Pearl',      price: 5000  },
          { category: 'color',       name: 'Golden Brown Metallic',    price: 8000  },
          { category: 'alloys',      name: '16" Stock Alloys',         price: 0     },
          { category: 'alloys',      name: '17" Diamond Cut Alloys',   price: 20000 },
          { category: 'sunroof',     name: 'No Sunroof',               price: 0     },
          { category: 'sunroof',     name: 'Electric Sunroof',         price: 38000 },
          { category: 'spoiler',     name: 'No Spoiler',               price: 0     },
          { category: 'spoiler',     name: 'OEM Trunk Spoiler',        price: 7500  },
          { category: 'accessories', name: 'Wireless Apple CarPlay',   price: 9000  },
          { category: 'accessories', name: 'Honda Sensing ADAS Kit',   price: 35000 },
          { category: 'accessories', name: 'All Season Floor Mats',    price: 3500  },
          { category: 'accessories', name: 'Door Edge Guards',         price: 1800  },
          { category: 'accessories', name: 'Trunk Organizer',          price: 2500  },
          { category: 'wrapping',    name: 'Gloss Black Wrap',         price: 50000 },
          { category: 'wrapping',    name: 'Satin White Wrap',         price: 48000 },
          { category: 'wrapping',    name: 'Carbon Hood Wrap',         price: 22000 },
        ]
      },

    ]);

    console.log('✅ 10 vehicles seeded successfully! (5 bikes + 5 cars)');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  });