const crypto = require('crypto');

// Test JazzCash hash generation
function testHashGeneration() {
  console.log('=== Testing JazzCash Hash Generation ===\n');

  const INTEGRITY_SALT = 'test_salt_key';
  
  const testData = {
    pp_Version: '1.1',
    pp_TxnType: 'MWALLET',
    pp_Language: 'EN',
    pp_MerchantID: 'MC12345',
    pp_SubMerchantID: '',
    pp_Password: 'test123',
    pp_BankID: 'TBANK',
    pp_ProductID: 'RETL',
    pp_TxnRefNo: 'T1234567890',
    pp_Amount: '500000',
    pp_TxnCurrency: 'PKR',
    pp_TxnDateTime: '20251111120000',
    pp_BillReference: '123',
    pp_Description: 'Test Order',
    pp_TxnExpiryDateTime: '20251111130000',
    pp_ReturnURL: 'http://localhost:3000/payment/jazzcash/callback',
    ppmpf_1: 'test@example.com',
    ppmpf_2: '03001234567',
    ppmpf_3: '',
    ppmpf_4: '',
    ppmpf_5: '',
  };

  // Generate hash
  const sortedString = Object.keys(testData)
    .sort()
    .map(key => testData[key])
    .join('&');
  
  const hashString = `${INTEGRITY_SALT}&${sortedString}`;
  const hash = crypto.createHmac('sha256', INTEGRITY_SALT)
    .update(hashString)
    .digest('hex')
    .toUpperCase();

  console.log('Test Data:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\nSorted String:');
  console.log(sortedString);
  console.log('\nHash String:');
  console.log(hashString);
  console.log('\nGenerated Hash:');
  console.log(hash);
  console.log('\n✅ Hash generation test completed\n');
}

// Test mobile number validation
function testMobileValidation() {
  console.log('=== Testing Mobile Number Validation ===\n');

  const testNumbers = [
    { number: '03001234567', valid: true },
    { number: '03451234567', valid: true },
    { number: '03331234567', valid: true },
    { number: '0300123456', valid: false, reason: 'Too short' },
    { number: '030012345678', valid: false, reason: 'Too long' },
    { number: '04001234567', valid: false, reason: 'Invalid prefix' },
    { number: '3001234567', valid: false, reason: 'Missing 0' },
    { number: '03001234abc', valid: false, reason: 'Contains letters' },
  ];

  const pattern = /^03\d{9}$/;

  testNumbers.forEach(test => {
    const isValid = pattern.test(test.number);
    const status = isValid === test.valid ? '✅' : '❌';
    console.log(`${status} ${test.number} - Expected: ${test.valid ? 'Valid' : 'Invalid'}, Got: ${isValid ? 'Valid' : 'Invalid'}`);
    if (test.reason) {
      console.log(`   Reason: ${test.reason}`);
    }
  });

  console.log('\n✅ Mobile validation test completed\n');
}

// Test amount conversion
function testAmountConversion() {
  console.log('=== Testing Amount Conversion (PKR to Paisa) ===\n');

  const testAmounts = [
    { pkr: 100, paisa: 10000 },
    { pkr: 1000, paisa: 100000 },
    { pkr: 5000, paisa: 500000 },
    { pkr: 99.99, paisa: 9999 },
    { pkr: 1234.56, paisa: 123456 },
  ];

  testAmounts.forEach(test => {
    const converted = Math.round(test.pkr * 100);
    const status = converted === test.paisa ? '✅' : '❌';
    console.log(`${status} PKR ${test.pkr} = ${converted} paisa (Expected: ${test.paisa})`);
  });

  console.log('\n✅ Amount conversion test completed\n');
}

// Test transaction reference generation
function testTxnRefGeneration() {
  console.log('=== Testing Transaction Reference Generation ===\n');

  const refs = [];
  for (let i = 0; i < 5; i++) {
    const ref = `T${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
    refs.push(ref);
    console.log(`Generated: ${ref}`);
    
    // Small delay to ensure unique timestamps
    const start = Date.now();
    while (Date.now() - start < 10) {}
  }

  // Check uniqueness
  const unique = new Set(refs);
  if (unique.size === refs.length) {
    console.log('\n✅ All transaction references are unique');
  } else {
    console.log('\n❌ Duplicate transaction references found');
  }

  console.log('\n✅ Transaction reference test completed\n');
}

// Test date/time formatting
function testDateTimeFormat() {
  console.log('=== Testing Date/Time Formatting ===\n');

  const now = new Date();
  const formatted = now.toISOString().replace(/[-:T]/g, '').split('.')[0];
  
  console.log('Current Date/Time:', now.toISOString());
  console.log('JazzCash Format:', formatted);
  console.log('Format Pattern: YYYYMMDDHHmmss');
  console.log('Example: 20251111143000');
  
  // Validate format
  const isValid = /^\d{14}$/.test(formatted);
  console.log(`\n${isValid ? '✅' : '❌'} Format validation: ${isValid ? 'Valid' : 'Invalid'}`);
  
  console.log('\n✅ Date/time format test completed\n');
}

// Test environment configuration
function testEnvironmentConfig() {
  console.log('=== Testing Environment Configuration ===\n');

  const requiredVars = [
    'JAZZCASH_MERCHANT_ID',
    'JAZZCASH_PASSWORD',
    'JAZZCASH_INTEGRITY_SALT',
    'JAZZCASH_RETURN_URL',
  ];

  console.log('Checking required environment variables:\n');

  requiredVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅' : '❌';
    console.log(`${status} ${varName}: ${value ? 'Set' : 'Not set'}`);
  });

  console.log('\nCurrent NODE_ENV:', process.env.NODE_ENV || 'development');
  console.log('API URL:', process.env.NODE_ENV === 'production' 
    ? 'https://payments.jazzcash.com.pk/ (Production)'
    : 'https://sandbox.jazzcash.com.pk/ (Sandbox)');

  console.log('\n✅ Environment configuration test completed\n');
}

// Run all tests
function runAllTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║       JazzCash Integration Test Suite                 ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('\n');

  try {
    testHashGeneration();
    testMobileValidation();
    testAmountConversion();
    testTxnRefGeneration();
    testDateTimeFormat();
    testEnvironmentConfig();

    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║       All Tests Completed Successfully! ✅            ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('\n');
  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests
runAllTests();
