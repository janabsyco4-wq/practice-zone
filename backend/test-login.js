const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testLogin() {
  const testAccounts = [
    { email: 'admin@shopai.com', password: 'password123' },
    { email: 'JANABSYCO4@GMAIL.COM', password: 'password123' },
  ];

  console.log('\n🔐 Testing Login...\n');
  console.log('═'.repeat(80));

  for (const account of testAccounts) {
    try {
      console.log(`\nTesting: ${account.email}`);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: account.email,
        password: account.password
      });

      console.log('✅ Login Successful!');
      console.log(`   Token: ${response.data.token.substring(0, 50)}...`);
      console.log(`   User: ${response.data.user.name}`);
      console.log(`   Role: ${response.data.user.role}`);
      
    } catch (error) {
      console.log('❌ Login Failed');
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Error: ${error.response.data.error || error.response.data.message}`);
      } else {
        console.log(`   Error: ${error.message}`);
      }
    }
  }

  console.log('\n' + '═'.repeat(80) + '\n');
}

testLogin();
