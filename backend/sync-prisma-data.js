const { PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const prisma = new PrismaClient();
const MONGODB_URI = process.env.DATABASE_URL;

async function syncData() {
  const mongoClient = new MongoClient(MONGODB_URI);
  
  try {
    await mongoClient.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = mongoClient.db('ai_ecommerce');
    
    // Sync Products
    console.log('\n📦 Syncing Products...');
    const mongoProducts = await db.collection('products').find({}).toArray();
    console.log(`Found ${mongoProducts.length} products in MongoDB`);
    
    for (const product of mongoProducts) {
      try {
        await prisma.product.upsert({
          where: { id: product._id.toString() },
          update: {
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            images: product.images || [],
            category: product.category,
            stock: product.stock || 100,
            isActive: product.isActive !== false,
          },
          create: {
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            images: product.images || [],
            category: product.category,
            stock: product.stock || 100,
            isActive: product.isActive !== false,
          },
        });
        console.log(`✅ Synced: ${product.name}`);
      } catch (error) {
        console.error(`❌ Failed to sync ${product.name}:`, error.message);
      }
    }
    
    // Sync Users
    console.log('\n👥 Syncing Users...');
    const mongoUsers = await db.collection('users').find({}).toArray();
    console.log(`Found ${mongoUsers.length} users in MongoDB`);
    
    for (const user of mongoUsers) {
      try {
        await prisma.user.upsert({
          where: { id: user._id.toString() },
          update: {
            email: user.email,
            password: user.password,
            name: user.name,
            role: user.role || 'USER',
          },
          create: {
            id: user._id.toString(),
            email: user.email,
            password: user.password,
            name: user.name,
            role: user.role || 'USER',
          },
        });
        console.log(`✅ Synced user: ${user.email}`);
      } catch (error) {
        console.error(`❌ Failed to sync user ${user.email}:`, error.message);
      }
    }
    
    // Sync Orders
    console.log('\n📋 Syncing Orders...');
    const mongoOrders = await db.collection('orders').find({}).toArray();
    console.log(`Found ${mongoOrders.length} orders in MongoDB`);
    
    for (const order of mongoOrders) {
      try {
        // First create the order
        await prisma.order.upsert({
          where: { id: order._id.toString() },
          update: {
            userId: order.userId,
            status: order.status || 'PENDING',
            total: order.total,
            stripePaymentId: order.stripePaymentId,
            shippingAddress: order.shippingAddress,
            trackingNumber: order.trackingNumber,
            carrier: order.carrier,
            estimatedDelivery: order.estimatedDelivery,
          },
          create: {
            id: order._id.toString(),
            userId: order.userId,
            status: order.status || 'PENDING',
            total: order.total,
            stripePaymentId: order.stripePaymentId,
            shippingAddress: order.shippingAddress,
            trackingNumber: order.trackingNumber,
            carrier: order.carrier,
            estimatedDelivery: order.estimatedDelivery,
          },
        });
        
        // Then sync order items
        if (order.items && order.items.length > 0) {
          for (const item of order.items) {
            await prisma.orderItem.upsert({
              where: { id: item._id?.toString() || `${order._id}-${item.productId}` },
              update: {
                orderId: order._id.toString(),
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
              },
              create: {
                id: item._id?.toString() || `${order._id}-${item.productId}`,
                orderId: order._id.toString(),
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
              },
            });
          }
        }
        
        console.log(`✅ Synced order: ${order._id}`);
      } catch (error) {
        console.error(`❌ Failed to sync order ${order._id}:`, error.message);
      }
    }
    
    console.log('\n✅ Data sync completed!');
    
    // Verify counts
    const prismaProductCount = await prisma.product.count();
    const prismaUserCount = await prisma.user.count();
    const prismaOrderCount = await prisma.order.count();
    
    console.log('\n📊 Final Counts:');
    console.log(`Products: ${prismaProductCount}`);
    console.log(`Users: ${prismaUserCount}`);
    console.log(`Orders: ${prismaOrderCount}`);
    
  } catch (error) {
    console.error('❌ Sync error:', error);
  } finally {
    await mongoClient.close();
    await prisma.$disconnect();
  }
}

syncData();
