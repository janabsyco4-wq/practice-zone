const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.DATABASE_URL;

// Valid placeholder images
const placeholderImages = {
  'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
  'Clothing': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
  'Home & Garden': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500',
  'Books': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500',
  'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500',
  'Toys': 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500',
  'default': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
};

async function fixImages() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('ai_ecommerce');
    const products = db.collection('products');
    
    // Get all products
    const allProducts = await products.find({}).toArray();
    console.log(`\nFound ${allProducts.length} products`);
    
    let fixed = 0;
    
    for (const product of allProducts) {
      const category = product.category || 'default';
      const newImage = placeholderImages[category] || placeholderImages['default'];
      
      // Update the product with a valid image
      await products.updateOne(
        { _id: product._id },
        { 
          $set: { 
            image: newImage,
            images: [newImage]
          } 
        }
      );
      
      console.log(`✅ Fixed: ${product.name} (${category})`);
      fixed++;
    }
    
    console.log(`\n✅ Fixed ${fixed} product images!`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

fixImages();
