# JazzCash Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Update Environment Variables

Open `backend/.env` and add your JazzCash credentials:

```env
# JazzCash Payment Gateway
JAZZCASH_MERCHANT_ID=your_merchant_id_here
JAZZCASH_PASSWORD=your_password_here
JAZZCASH_INTEGRITY_SALT=your_integrity_salt_here
JAZZCASH_RETURN_URL=https://your-domain.com/payment/jazzcash/callback
```

### Step 2: Test the Integration

Run the test script to verify everything is configured correctly:

```bash
node backend/test-jazzcash.js
```

You should see all tests passing ✅

### Step 3: Start the Server

```bash
# Development mode (uses sandbox)
npm run dev

# Production mode (uses live gateway)
NODE_ENV=production npm start
```

### Step 4: Test Payment Flow

1. Add items to cart
2. Proceed to checkout
3. Select JazzCash payment
4. Enter mobile number: `03001234567`
5. Complete payment on JazzCash gateway

## 📋 Getting JazzCash Credentials

### For Testing (Sandbox)

Contact JazzCash support to get sandbox credentials:
- Email: merchantsupport@jazzcash.com.pk
- Phone: 111-124-444

They will provide:
- Test Merchant ID
- Test Password
- Test Integrity Salt

### For Production

1. **Register as Merchant**
   - Visit: https://sandbox.jazzcash.com.pk/
   - Fill merchant registration form
   - Submit required documents

2. **Required Documents**
   - Business registration certificate
   - NTN (National Tax Number)
   - CNIC of business owner
   - Bank account details
   - Business address proof

3. **Approval Process**
   - JazzCash reviews application (3-5 business days)
   - Site inspection (if required)
   - Credentials provided after approval

## 🔧 Configuration Options

### Environment Modes

**Development (Sandbox)**
```env
NODE_ENV=development
```
- Uses sandbox URL
- Test credentials
- No real money transactions

**Production (Live)**
```env
NODE_ENV=production
```
- Uses production URL
- Real credentials
- Real money transactions

### Return URL Configuration

The return URL is where customers are redirected after payment:

```env
# Local development
JAZZCASH_RETURN_URL=http://localhost:3000/payment/jazzcash/callback

# Production
JAZZCASH_RETURN_URL=https://your-domain.com/payment/jazzcash/callback
```

**Important:** This URL must be:
- Publicly accessible (for production)
- Registered with JazzCash
- Using HTTPS (for production)

## 🧪 Testing Checklist

Before going live, test these scenarios:

- [ ] Successful payment
- [ ] Failed payment (insufficient balance)
- [ ] Cancelled payment
- [ ] Invalid mobile number
- [ ] Transaction timeout
- [ ] Duplicate transaction
- [ ] Refund processing
- [ ] Order status update
- [ ] Email notifications
- [ ] Callback handling

## 📱 Test Mobile Numbers

For sandbox testing, use these numbers:

| Mobile Number | Result |
|---------------|--------|
| 03001234567 | Success |
| 03001234568 | Insufficient Balance |
| 03001234569 | Invalid PIN |
| 03001234570 | Transaction Declined |

## 💰 Test Amounts

- Minimum: PKR 10
- Maximum: PKR 1,000,000
- Recommended test: PKR 100

## 🔐 Security Best Practices

1. **Never commit credentials**
   - Keep `.env` in `.gitignore`
   - Use environment variables
   - Rotate credentials regularly

2. **Validate all inputs**
   - Mobile number format
   - Amount ranges
   - Order ownership

3. **Verify callbacks**
   - Check secure hash
   - Validate response code
   - Log all transactions

4. **Use HTTPS**
   - Required for production
   - Protects sensitive data
   - Prevents man-in-the-middle attacks

## 🐛 Common Issues & Solutions

### Issue: "Invalid Hash" Error

**Cause:** Integrity salt mismatch or incorrect hash generation

**Solution:**
1. Verify integrity salt in `.env`
2. Check all parameters are included
3. Ensure parameters are sorted correctly
4. Run test script to verify hash generation

### Issue: "Merchant Not Found"

**Cause:** Invalid merchant ID or not registered

**Solution:**
1. Verify merchant ID in `.env`
2. Check if merchant is active
3. Contact JazzCash support

### Issue: "Transaction Timeout"

**Cause:** Network issues or slow response

**Solution:**
1. Check internet connectivity
2. Verify JazzCash API is accessible
3. Increase timeout duration
4. Retry transaction

### Issue: "Callback Not Received"

**Cause:** Return URL not accessible or incorrect

**Solution:**
1. Verify return URL is publicly accessible
2. Check URL is registered with JazzCash
3. Test URL manually
4. Check server logs

## 📊 Monitoring & Logs

### Backend Logs

All JazzCash operations are logged with `[JazzCash]` prefix:

```
[JazzCash] Payment initiated for Order #123, Amount: PKR 5000
[JazzCash] Payment callback received: orderId=123, responseCode=000
[JazzCash] Order #123 updated - Status: PROCESSING
```

### Transaction Tracking

Track transactions in database:
- Order ID
- Transaction Reference
- Response Code
- Amount
- Status
- Timestamp

## 🚀 Going Live Checklist

Before switching to production:

- [ ] Get production credentials from JazzCash
- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Configure production return URL
- [ ] Test with real mobile number
- [ ] Verify SSL certificate
- [ ] Set up error monitoring
- [ ] Configure backup system
- [ ] Train support team
- [ ] Document customer support process
- [ ] Test refund process
- [ ] Set up transaction alerts
- [ ] Review security measures
- [ ] Perform load testing
- [ ] Create rollback plan

## 📞 Support Contacts

### JazzCash Support
- **Email:** merchantsupport@jazzcash.com.pk
- **Phone:** 111-124-444
- **Hours:** 9 AM - 6 PM (Mon-Fri)
- **Website:** https://sandbox.jazzcash.com.pk/

### Technical Issues
- Check documentation: `JAZZCASH_INTEGRATION.md`
- Run test script: `node backend/test-jazzcash.js`
- Review logs in backend console
- Contact JazzCash technical support

## 📚 Additional Resources

- **API Documentation:** Contact JazzCash support
- **Integration Guide:** `JAZZCASH_INTEGRATION.md`
- **Test Script:** `backend/test-jazzcash.js`
- **Component:** `frontend/src/components/JazzCashPayment.tsx`
- **Callback Page:** `frontend/src/app/payment/jazzcash/callback/page.tsx`

---

**Need Help?**
- Review the detailed integration guide: `JAZZCASH_INTEGRATION.md`
- Run the test script to diagnose issues
- Contact JazzCash support for credentials and API access

**Last Updated:** November 11, 2025
