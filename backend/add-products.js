const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  // Electronics (15 products)
  {
    name: 'iPhone 15 Pro Max',
    description: 'Latest flagship smartphone with A17 Pro chip, titanium design, and advanced camera system',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1696446702183-cbd50c2a8d53',
    images: 'https://images.unsplash.com/photo-1696446702183-cbd50c2a8d53',
    category: 'Electronics',
    stock: 25,
  },
  {
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop with M3 Max chip, 32GB RAM, perfect for professionals',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    images: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    category: 'Electronics',
    stock: 15,
  },
  {
    name: 'iPad Air',
    description: 'Versatile tablet with M1 chip, 10.9-inch display, perfect for creativity',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
    images: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
    category: 'Electronics',
    stock: 40,
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    images: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    category: 'Electronics',
    stock: 60,
  },
  {
    name: 'Samsung 4K Smart TV 55"',
    description: 'Crystal clear 4K display with smart features and HDR support',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1',
    images: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1',
    category: 'Electronics',
    stock: 20,
  },
  {
    name: 'Canon EOS R6',
    description: 'Professional mirrorless camera with 20MP sensor and 4K video',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1606980707986-7b0c4a7c4b0f',
    images: 'https://images.unsplash.com/photo-1606980707986-7b0c4a7c4b0f',
    category: 'Electronics',
    stock: 12,
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Gaming console with vibrant OLED screen and enhanced audio',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e',
    images: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e',
    category: 'Electronics',
    stock: 35,
  },
  {
    name: 'DJI Mini 3 Pro Drone',
    description: 'Compact drone with 4K camera and intelligent flight modes',
    price: 759.99,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f',
    images: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f',
    category: 'Electronics',
    stock: 18,
  },
  {
    name: 'Kindle Paperwhite',
    description: 'E-reader with adjustable warm light and waterproof design',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666',
    images: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666',
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Premium wireless mouse with ergonomic design and precision tracking',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
    images: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
    category: 'Electronics',
    stock: 75,
  },
  {
    name: 'Mechanical Keyboard RGB',
    description: 'Gaming keyboard with Cherry MX switches and customizable RGB lighting',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
    images: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
    category: 'Electronics',
    stock: 45,
  },
  {
    name: 'Webcam 4K Pro',
    description: 'Professional webcam with auto-focus and noise-canceling microphone',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d',
    images: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d',
    category: 'Electronics',
    stock: 55,
  },
  {
    name: 'Portable SSD 2TB',
    description: 'Ultra-fast external storage with USB-C connectivity',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b',
    images: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b',
    category: 'Electronics',
    stock: 65,
  },
  {
    name: 'Smart Speaker Echo',
    description: 'Voice-controlled speaker with Alexa and premium sound',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230',
    images: 'https://images.unsplash.com/photo-1543512214-318c7553f230',
    category: 'Electronics',
    stock: 80,
  },
  {
    name: 'Fitness Tracker Watch',
    description: 'Advanced fitness tracker with heart rate monitor and GPS',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6',
    images: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6',
    category: 'Electronics',
    stock: 70,
  },

  // Fashion (15 products)
  {
    name: 'Leather Jacket Classic',
    description: 'Premium genuine leather jacket with timeless design',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
    images: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
    category: 'Fashion',
    stock: 30,
  },
  {
    name: 'Designer Sunglasses',
    description: 'Polarized sunglasses with UV protection and stylish frames',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    images: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    category: 'Fashion',
    stock: 50,
  },
  {
    name: 'Denim Jeans Slim Fit',
    description: 'Comfortable stretch denim with modern slim fit',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    images: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    category: 'Fashion',
    stock: 100,
  },
  {
    name: 'Casual Sneakers',
    description: 'Comfortable everyday sneakers with cushioned sole',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    images: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    category: 'Fashion',
    stock: 85,
  },
  {
    name: 'Wool Sweater',
    description: 'Cozy merino wool sweater perfect for cold weather',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    images: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    category: 'Fashion',
    stock: 60,
  },
  {
    name: 'Summer Dress Floral',
    description: 'Light and breezy floral dress perfect for summer',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    images: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    category: 'Fashion',
    stock: 45,
  },
  {
    name: 'Business Suit',
    description: 'Professional two-piece suit with modern tailoring',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
    images: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
    category: 'Fashion',
    stock: 25,
  },
  {
    name: 'Leather Belt',
    description: 'Genuine leather belt with classic buckle',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb',
    images: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb',
    category: 'Fashion',
    stock: 90,
  },
  {
    name: 'Winter Coat',
    description: 'Warm insulated coat with water-resistant exterior',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3',
    images: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3',
    category: 'Fashion',
    stock: 35,
  },
  {
    name: 'Silk Scarf',
    description: 'Luxurious silk scarf with elegant pattern',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26',
    images: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26',
    category: 'Fashion',
    stock: 70,
  },
  {
    name: 'Baseball Cap',
    description: 'Adjustable cotton cap with embroidered logo',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b',
    images: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b',
    category: 'Fashion',
    stock: 120,
  },
  {
    name: 'Leather Handbag',
    description: 'Elegant leather handbag with multiple compartments',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    images: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    category: 'Fashion',
    stock: 40,
  },
  {
    name: 'Formal Watch',
    description: 'Classic analog watch with leather strap',
    price: 279.99,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
    images: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
    category: 'Fashion',
    stock: 55,
  },
  {
    name: 'Yoga Pants',
    description: 'Stretchy and comfortable yoga pants for active lifestyle',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
    images: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
    category: 'Fashion',
    stock: 95,
  },
  {
    name: 'Hoodie Premium',
    description: 'Soft cotton blend hoodie with kangaroo pocket',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
    images: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
    category: 'Fashion',
    stock: 110,
  },

  // Home & Living (15 products)
  {
    name: 'Smart LED Bulbs 4-Pack',
    description: 'WiFi-enabled color-changing LED bulbs with app control',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1550985616-10810253b84d',
    images: 'https://images.unsplash.com/photo-1550985616-10810253b84d',
    category: 'Home',
    stock: 80,
  },
  {
    name: 'Memory Foam Pillow',
    description: 'Ergonomic pillow with cooling gel and adjustable height',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2',
    images: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2',
    category: 'Home',
    stock: 65,
  },
  {
    name: 'Blender Pro 1000W',
    description: 'High-powered blender for smoothies and food processing',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62',
    images: 'https://images.unsplash.com/photo-1585515320310-259814833e62',
    category: 'Home',
    stock: 45,
  },
  {
    name: 'Air Purifier HEPA',
    description: 'Advanced air purifier with HEPA filter and smart sensors',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd',
    images: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd',
    category: 'Home',
    stock: 35,
  },
  {
    name: 'Vacuum Cleaner Robot',
    description: 'Smart robot vacuum with mapping and auto-charging',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001',
    images: 'https://images.unsplash.com/photo-1558317374-067fb5f30001',
    category: 'Home',
    stock: 28,
  },
  {
    name: 'Cookware Set 10-Piece',
    description: 'Non-stick cookware set with glass lids',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
    images: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
    category: 'Home',
    stock: 40,
  },
  {
    name: 'Bedding Set Queen',
    description: 'Luxury cotton bedding set with duvet cover and pillowcases',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    images: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    category: 'Home',
    stock: 50,
  },
  {
    name: 'Wall Art Canvas',
    description: 'Modern abstract canvas art for home decoration',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca',
    images: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca',
    category: 'Home',
    stock: 60,
  },
  {
    name: 'Table Lamp Modern',
    description: 'Minimalist table lamp with adjustable brightness',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    images: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    category: 'Home',
    stock: 75,
  },
  {
    name: 'Area Rug 5x7',
    description: 'Soft area rug with modern geometric pattern',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843',
    images: 'https://images.unsplash.com/photo-1600166898405-da9535204843',
    category: 'Home',
    stock: 30,
  },
  {
    name: 'Storage Organizer',
    description: 'Multi-compartment storage organizer for closet',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2',
    images: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2',
    category: 'Home',
    stock: 85,
  },
  {
    name: 'Humidifier Ultrasonic',
    description: 'Quiet ultrasonic humidifier with essential oil diffuser',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17',
    images: 'https://images.unsplash.com/photo-1585421514738-01798e348b17',
    category: 'Home',
    stock: 55,
  },
  {
    name: 'Curtains Blackout',
    description: 'Thermal insulated blackout curtains for bedroom',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    images: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    category: 'Home',
    stock: 70,
  },
  {
    name: 'Desk Organizer',
    description: 'Bamboo desk organizer with multiple compartments',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7',
    images: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7',
    category: 'Home',
    stock: 90,
  },
  {
    name: 'Throw Pillows Set',
    description: 'Decorative throw pillows set of 4 with covers',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    images: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    category: 'Home',
    stock: 100,
  },

  // Sports & Fitness (10 products)
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with carrying strap',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f',
    images: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f',
    category: 'Sports',
    stock: 120,
  },
  {
    name: 'Dumbbell Set Adjustable',
    description: 'Adjustable dumbbells 5-52.5 lbs with stand',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    images: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    category: 'Sports',
    stock: 35,
  },
  {
    name: 'Resistance Bands Set',
    description: 'Set of 5 resistance bands with handles and door anchor',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc',
    images: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc',
    category: 'Sports',
    stock: 95,
  },
  {
    name: 'Treadmill Folding',
    description: 'Compact folding treadmill with LCD display',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c',
    images: 'https://images.unsplash.com/photo-1576678927484-cc907957088c',
    category: 'Sports',
    stock: 15,
  },
  {
    name: 'Protein Shaker Bottle',
    description: 'Leak-proof shaker bottle with mixing ball',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1622484211850-cc1f8f6b1a2e',
    images: 'https://images.unsplash.com/photo-1622484211850-cc1f8f6b1a2e',
    category: 'Sports',
    stock: 150,
  },
  {
    name: 'Gym Bag Duffel',
    description: 'Spacious gym bag with shoe compartment',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    images: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: 'Sports',
    stock: 80,
  },
  {
    name: 'Jump Rope Speed',
    description: 'Adjustable speed jump rope for cardio workouts',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00',
    images: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00',
    category: 'Sports',
    stock: 110,
  },
  {
    name: 'Foam Roller',
    description: 'High-density foam roller for muscle recovery',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e',
    images: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e',
    category: 'Sports',
    stock: 75,
  },
  {
    name: 'Water Bottle Insulated',
    description: 'Stainless steel water bottle keeps drinks cold 24hrs',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    images: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    category: 'Sports',
    stock: 130,
  },
  {
    name: 'Exercise Ball',
    description: 'Anti-burst exercise ball with pump included',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
    images: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
    category: 'Sports',
    stock: 65,
  },
];

async function addProducts() {
  console.log('🌱 Adding products to database...\n');

  let added = 0;
  let skipped = 0;

  for (const product of products) {
    try {
      // Check if product already exists
      const existing = await prisma.product.findFirst({
        where: { name: product.name },
      });

      if (existing) {
        console.log(`⏭️  Skipped: ${product.name} (already exists)`);
        skipped++;
        continue;
      }

      await prisma.product.create({
        data: product,
      });

      console.log(`✅ Added: ${product.name} - $${product.price}`);
      added++;
    } catch (error) {
      console.error(`❌ Error adding ${product.name}:`, error.message);
    }
  }

  console.log('\n========================================');
  console.log(`✅ Successfully added: ${added} products`);
  console.log(`⏭️  Skipped (duplicates): ${skipped} products`);
  console.log(`📦 Total in catalog: ${added + skipped} products`);
  console.log('========================================\n');

  // Show category breakdown
  const categories = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  });

  console.log('📊 Products by Category:');
  categories.forEach(cat => {
    console.log(`   ${cat.category}: ${cat._count} products`);
  });
  console.log();
}

addProducts()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
