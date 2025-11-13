const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const newProducts = [
  // Electronics
  {
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    category: "Electronics",
    stock: 50
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking, heart rate monitoring, GPS, and smartphone notifications. Water-resistant with 7-day battery life.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"],
    category: "Electronics",
    stock: 75
  },
  {
    name: "4K Webcam",
    description: "Professional 4K webcam with auto-focus, built-in microphone, and excellent low-light performance. Ideal for streaming and video calls.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800",
    images: ["https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800"],
    category: "Electronics",
    stock: 40
  },
  {
    name: "Mechanical Gaming Keyboard",
    description: "RGB backlit mechanical keyboard with customizable keys, anti-ghosting, and durable switches. Perfect for gaming and typing.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=800"],
    category: "Electronics",
    stock: 60
  },
  {
    name: "Wireless Gaming Mouse",
    description: "High-precision wireless mouse with adjustable DPI, programmable buttons, and ergonomic design. 70-hour battery life.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800"],
    category: "Electronics",
    stock: 80
  },
  
  // Fashion & Clothing
  {
    name: "Classic Leather Jacket",
    description: "Genuine leather jacket with premium stitching and timeless design. Perfect for any season and occasion.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"],
    category: "Clothing",
    stock: 30
  },
  {
    name: "Designer Sunglasses",
    description: "UV400 protection polarized sunglasses with stylish frame. Includes protective case and cleaning cloth.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"],
    category: "Accessories",
    stock: 100
  },
  {
    name: "Premium Cotton T-Shirt",
    description: "Soft, breathable 100% organic cotton t-shirt. Available in multiple colors with a comfortable fit.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"],
    category: "Clothing",
    stock: 200
  },
  {
    name: "Running Sneakers",
    description: "Lightweight athletic shoes with cushioned sole and breathable mesh. Perfect for running and everyday wear.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
    category: "Footwear",
    stock: 90
  },
  {
    name: "Leather Backpack",
    description: "Stylish genuine leather backpack with laptop compartment and multiple pockets. Perfect for work or travel.",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"],
    category: "Accessories",
    stock: 45
  },
  
  // Home & Living
  {
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800"],
    category: "Home & Garden",
    stock: 70
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic mugs with unique designs. Microwave and dishwasher safe.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800"],
    category: "Home & Garden",
    stock: 120
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra thick non-slip yoga mat with carrying strap. Eco-friendly material, perfect for all types of exercise.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
    images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800"],
    category: "Sports",
    stock: 85
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800"],
    category: "Sports",
    stock: 150
  },
  {
    name: "Scented Candle Collection",
    description: "Set of 3 premium soy wax candles with natural essential oils. Long-lasting with calming scents.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1602874801006-e24b3e2a4e80?w=800",
    images: ["https://images.unsplash.com/photo-1602874801006-e24b3e2a4e80?w=800"],
    category: "Home & Garden",
    stock: 95
  },
  
  // Books & Media
  {
    name: "Hardcover Journal",
    description: "Premium leather-bound journal with thick cream pages. Perfect for writing, sketching, or planning.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800",
    images: ["https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800"],
    category: "Books",
    stock: 110
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with 360° sound and 12-hour battery. Perfect for outdoor adventures.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800"],
    category: "Electronics",
    stock: 65
  },
  {
    name: "Vintage Camera",
    description: "Classic film camera in excellent condition. Perfect for photography enthusiasts and collectors.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
    images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800"],
    category: "Electronics",
    stock: 25
  },
  {
    name: "Wireless Earbuds Pro",
    description: "True wireless earbuds with active noise cancellation and premium sound. 24-hour battery with charging case.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800"],
    category: "Electronics",
    stock: 100
  },
  {
    name: "Plant Pot Set",
    description: "Set of 3 modern ceramic plant pots with drainage holes. Perfect for succulents and small plants.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800"],
    category: "Home & Garden",
    stock: 130
  }
];

async function seedProducts() {
  try {
    console.log('🗑️  Deleting existing data...');
    
    // Delete in correct order to respect foreign key constraints
    await prisma.orderItem.deleteMany({});
    console.log('✅ Order items deleted');
    
    await prisma.cartItem.deleteMany({});
    console.log('✅ Cart items deleted');
    
    await prisma.userInteraction.deleteMany({});
    console.log('✅ User interactions deleted');
    
    await prisma.product.deleteMany({});
    console.log('✅ All products deleted');
    
    console.log('\n📦 Adding 20 new products...');
    
    for (const product of newProducts) {
      const created = await prisma.product.create({
        data: product
      });
      console.log(`✅ Added: ${created.name} - $${created.price}`);
    }
    
    console.log('\n✅ Successfully added 20 products!');
    
    const count = await prisma.product.count();
    console.log(`\n📊 Total products in database: ${count}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
