import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@shopai.com' },
        update: {},
        create: {
            email: 'admin@shopai.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    });

    console.log('✅ Admin user created:', admin.email);

    // Create sample products
    const products = [
        {
            name: 'Wireless Headphones',
            description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            category: 'Electronics',
            stock: 50,
        },
        {
            name: 'Smart Watch',
            description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
            price: 399.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            category: 'Electronics',
            stock: 30,
        },
        {
            name: 'Laptop Backpack',
            description: 'Durable water-resistant backpack with laptop compartment',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
            category: 'Accessories',
            stock: 100,
        },
        {
            name: 'Mechanical Keyboard',
            description: 'RGB mechanical gaming keyboard with customizable keys',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
            category: 'Electronics',
            stock: 45,
        },
        {
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse with precision tracking',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
            category: 'Electronics',
            stock: 80,
        },
        {
            name: 'USB-C Hub',
            description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
            category: 'Accessories',
            stock: 60,
        },
    ];

    for (const product of products) {
        await prisma.product.create({ data: product });
    }

    console.log(`✅ Created ${products.length} products`);
    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
