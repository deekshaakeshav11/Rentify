const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Item.deleteMany();
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash('test1234', 10);
    const user = await User.create({
      name: 'Admin',
      email: 'admin@rentify.com',
      password: hashedPassword
    });

    await Item.insertMany([
      // 🏠 ROOMS
      { name: 'PG Room', description: 'Comfortable PG room with all amenities', price: 5000, category: 'Rooms', condition: 'Good', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400', owner: user._id },
      { name: 'Studio Apartment', description: 'Modern studio apartment for rent', price: 12000, category: 'Rooms', condition: 'Better', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', owner: user._id },
      { name: 'Office Space', description: 'Professional office space available', price: 20000, category: 'Rooms', condition: 'Better', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', owner: user._id },
      { name: 'Shared Room', description: 'Affordable shared room in prime location', price: 3000, category: 'Rooms', condition: 'Good', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400', owner: user._id },
      { name: 'Villa', description: 'Luxurious villa for rent', price: 50000, category: 'Rooms', condition: 'Better', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', owner: user._id },
      { name: 'Room', description: 'Cozy room for rent', price: 2000, category: 'Rooms', condition: 'Better', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400', owner: user._id },

      // 🚗 VEHICLES
      { name: 'Scooter', description: 'Fuel efficient scooter for daily commute', price: 200, category: 'Vehicles', condition: 'Good', image: '/uploads/scooter.jpg', owner: user._id },
      { name: 'Car', description: 'Comfortable car for rent', price: 1500, category: 'Vehicles', condition: 'Better', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400', owner: user._id },
      { name: 'Bicycle', description: 'Eco friendly bicycle for rent', price: 100, category: 'Vehicles', condition: 'Good', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400', owner: user._id },
      { name: 'Electric Bike', description: 'Modern electric bike for rent', price: 400, category: 'Vehicles', condition: 'Better', image: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?w=400', owner: user._id },
      { name: 'Van', description: 'Spacious van for rent', price: 2000, category: 'Vehicles', condition: 'Good', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400', owner: user._id },
      { name: 'Bike', description: 'Comfortable bike for rent', price: 300, category: 'Vehicles', condition: 'Good', image: '/uploads/motorbike.jpg', owner: user._id },

      // 👕 CLOTHES
      { name: 'Saree', description: 'Beautiful silk saree for rent', price: 800, category: 'Clothes', condition: 'Better', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', owner: user._id },
      { name: 'Lehenga', description: 'Designer lehenga for special occasions', price: 2500, category: 'Clothes', condition: 'Better', image:  '/uploads/lehenga.jpg', owner: user._id },
      { name: 'Blazer', description: 'Formal blazer for rent', price: 400, category: 'Clothes', condition: 'Good', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400', owner: user._id },
      { name: 'Party Dress', description: 'Stylish party dress for rent', price: 600, category: 'Clothes', condition: 'Better', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', owner: user._id },
      { name: 'Shoes', description: 'Formal and casual shoes for rent', price: 200, category: 'Clothes', condition: 'Good', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', owner: user._id },
      { name: 'Kurta', description: 'Beautiful kurta for rent', price: 500, category: 'Clothes', condition: 'Good', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400', owner: user._id },

      // 📚 BOOKS
      { name: 'Engineering Textbooks', description: 'Complete set of engineering textbooks', price: 150, category: 'Books', condition: 'Good', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', owner: user._id },
      { name: 'Novels', description: 'Collection of bestseller novels', price: 50, category: 'Books', condition: 'Good', image: '/uploads/novel.jpg', owner: user._id },
      { name: 'Competitive Exam Books', description: 'Books for UPSC, CAT, GATE preparation', price: 200, category: 'Books', condition: 'Better', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400', owner: user._id },
      { name: 'Magazines', description: 'Latest magazines for rent', price: 30, category: 'Books', condition: 'Good', image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400', owner: user._id },
      { name: 'Story Books', description: 'Childrens story books for rent', price: 40, category: 'Books', condition: 'Good', image: '/uploads/story book.jpg', owner: user._id },

      // ⚙️ MACHINES
      { name: 'Cement Mixer', description: 'Heavy duty cement mixer for construction', price: 1200, category: 'Machines', condition: 'Good', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400', owner: user._id },
      { name: 'Welding Machine', description: 'Professional welding machine for rent', price: 800, category: 'Machines', condition: 'Better', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400', owner: user._id },
      { name: 'Ladder', description: 'Heavy duty ladder for rent', price: 200, category: 'Machines', condition: 'Good', image: '/uploads/ladder.jpg', owner: user._id },
      { name: 'Generator', description: 'Powerful generator for rent', price: 1500, category: 'Machines', condition: 'Better', image: '/uploads/generator.jpg', owner: user._id },
      { name: 'Pressure Washer', description: 'High pressure washer for rent', price: 600, category: 'Machines', condition: 'Good', image: '/uploads/pressure washer.jpg', owner: user._id },
      { name: 'Drill Machine', description: 'Heavy duty drill machine for rent', price: 800, category: 'Machines', condition: 'Better', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400', owner: user._id },

      // 💻 ELECTRONICS
      { name: 'Laptop', description: 'High performance laptop for rent', price: 1200, category: 'Electronics', condition: 'Better', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', owner: user._id },
      { name: 'Mobile Phone', description: 'Latest smartphone for rent', price: 500, category: 'Electronics', condition: 'Better', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', owner: user._id },
      { name: 'Tablet', description: 'iPad and Android tablets for rent', price: 700, category: 'Electronics', condition: 'Better', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', owner: user._id },
      { name: 'Camera', description: 'DSLR camera for rent', price: 1000, category: 'Electronics', condition: 'Good', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', owner: user._id },
      { name: 'Projector', description: 'HD projector for rent', price: 900, category: 'Electronics', condition: 'Better', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400', owner: user._id },
      { name: 'Speaker', description: 'Bluetooth speaker for rent', price: 300, category: 'Electronics', condition: 'Good', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', owner: user._id },

      // 🎉 EVENTS
      { name: 'Chairs', description: 'Event chairs for rent', price: 10, category: 'Events', condition: 'Good', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400', owner: user._id },
      { name: 'Tables', description: 'Event tables for rent', price: 200, category: 'Events', condition: 'Good', image: '/uploads/tables.jpg', owner: user._id },
      { name: 'Sound System', description: 'Professional sound system for events', price: 2000, category: 'Events', condition: 'Better', image: '/uploads/sound system.jpg', owner: user._id },
      { name: 'Decoration Lights', description: 'Beautiful decoration lights for events', price: 500, category: 'Events', condition: 'Good', image: '/uploads/decoration light.jpg', owner: user._id },

      // 🎮 ENTERTAINMENT
      { name: 'PlayStation', description: 'PS5 gaming console for rent', price: 800, category: 'Entertainment', condition: 'Better', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400', owner: user._id },
      { name: 'VR Headset', description: 'Virtual reality headset for rent', price: 600, category: 'Entertainment', condition: 'Better', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400', owner: user._id },
      { name: 'Board Games', description: 'Collection of board games for rent', price: 100, category: 'Entertainment', condition: 'Good', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400', owner: user._id },

      // 🧳 TRAVEL
      { name: 'Luggage Bags', description: 'Travel luggage bags for rent', price: 200, category: 'Travel', condition: 'Good', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', owner: user._id },
      { name: 'Travel Kit', description: 'Complete travel kit for rent', price: 150, category: 'Travel', condition: 'Good', image: '/uploads/travel kit.jpg', owner: user._id },
    ]);

    console.log('✅ All items added successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seedData();