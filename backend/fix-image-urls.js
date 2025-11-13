const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixImageUrls() {
  console.log('🔍 Checking product image URLs...\n');

  const products = await prisma.product.findMany();
  let fixed = 0;
  let valid = 0;

  const defaultImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';

  for (const product of products) {
    // Check if image URL is valid
    if (!product.image || 
        !product.image.startsWith('http') || 
        product.image.includes('data:image') ||
        product.image.length < 10) {
      
      console.log(`❌ Invalid image for: ${product.name}`);
      console.log(`   Old URL: ${product.image}`);
      
      await prisma.product.update({
        where: { id: product.id },
        data: { 
          image: defaultImage,
          images: defaultImage
        },
      });
      
      console.log(`   ✅ Fixed with default image\n`);
      fixed++;
    } else {
      valid++;
    }
  }

  console.log('========================================');
  console.log(`✅ Valid images: ${valid}`);
  console.log(`🔧 Fixed images: ${fixed}`);
  console.log('========================================\n');
}

fixImageUrls()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
