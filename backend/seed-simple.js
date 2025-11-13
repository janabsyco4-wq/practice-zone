const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created');

  // Create test user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: userPassword,
      name: 'Test User',
      role: 'USER',
    },
  });
  console.log('✅ Test user created');

  // Create products
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      images: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: 'Electronics',
      stock: 50,
      isActive: true,
    },
    {
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with fitness tracking',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      images: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      category: 'Electronics',
      stock: 30,
      isActive: true,
    },
    {
      name: 'Laptop Backpack',
      description: 'Durable backpack with laptop compartment',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      images: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      category: 'Accessories',
      stock: 100,
      isActive: true,
    },
    {
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with thermal carafe',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
      images: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6',
      category: 'Home',
      stock: 25,
      isActive: true,
    },
    {
      name: 'Running Shoes',
      description: 'Comfortable running shoes with excellent support',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      images: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      category: 'Sports',
      stock: 75,
      isActive: true,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log('✅ Products created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
