require('dotenv').config();

console.log('\n🔍 Environment Variables Check:\n');
console.log('═'.repeat(80));
console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
console.log('═'.repeat(80));

if (process.env.FRONTEND_URL === 'http://localhost:3000') {
  console.log('\n⚠️  WARNING: Still using localhost!');
  console.log('Expected: https://ecommerce-ivchz6i4s-shehrooz-hafeezs-projects.vercel.app\n');
} else if (process.env.FRONTEND_URL?.includes('vercel.app')) {
  console.log('\n✅ Correctly configured with Vercel URL!\n');
} else {
  console.log('\n❌ Unexpected URL configuration\n');
}
