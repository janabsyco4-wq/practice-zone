require('dotenv').config();

console.log('\n📧 Email Links Test:\n');
console.log('═'.repeat(80));

const FRONTEND_URL = process.env.FRONTEND_URL;

console.log(`Frontend URL: ${FRONTEND_URL}\n`);

console.log('Email Links:');
console.log(`1. Start Shopping: ${FRONTEND_URL}/products`);
console.log(`2. View Orders: ${FRONTEND_URL}/orders`);
console.log(`3. Login: ${FRONTEND_URL}/auth/login`);

console.log('\n' + '═'.repeat(80));

if (FRONTEND_URL?.includes('vercel.app')) {
  console.log('\n✅ All email links will point to Vercel deployment!');
  console.log('✅ Backend is correctly configured.\n');
} else {
  console.log('\n⚠️  Email links will point to localhost');
  console.log('Please update FRONTEND_URL in backend/.env\n');
}
