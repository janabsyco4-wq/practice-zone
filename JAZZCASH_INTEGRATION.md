# JazzCash Payment Gateway Integration Guide

## Overview
This document provides complete instructions for integrating JazzCash payment gateway in production mode for Pakistani customers.

## Features Implemented

### Backend Features
- ✅ Production-ready JazzCash API integration
- ✅ Secure hash generation (HMAC SHA256)
- ✅ Payment initiation with order details
- ✅ Payment callback handling and verification
- ✅ Transaction status inquiry
- ✅ Refund processing
- ✅ Comprehensive error handling and logging
- ✅ Mobile number validation (Pakistani format)

### Frontend Features
- ✅ JazzCash payment component
- ✅ Mobile number input with validation
- ✅ Payment callback page with status display
- ✅ Automatic redirection after successful payment
- ✅ User-friendly error messages

## Configuration

### 1. Backend Environment Variables

Add these to your `backend/.env` file:

```env
# JazzCash Payment Gateway (Production)
JAZZCASH_MERCHANT_ID=your_merchant_id_here
JAZZCASH_PASSWORD=your_password_here
JAZZCASH_INTEGRITY_SALT=your_integrity_salt_here
JAZZCASH_RETURN_URL=https://your-domain.com/payment/jazzcash/callback
```

### 2. Get JazzCash Credentials

To get production credentials:

1. **Contact JazzCash Business Team**
   - Email: merchantsupport@jazzcash.com.pk
   - Phone: 111-124-444
   - Website: https://sandbox.jazzcash.com.pk/

2. **Required Documents**
   - Business registration certificate
   - NTN (National Tax Number)
   - CNIC of business owner
   - Bank account details
   - Business address proof

3. **Credentials You'll Receive**
   - Merchant ID (pp_MerchantID)
   - Password (pp_Password)
   - Integrity Salt (for hash generation)

### 3. Testing Mode

For testing, use sandbox credentials:
- Set `NODE_ENV=development` in `.env`
- Use sandbox URL: https://sandbox.jazzcash.com.pk/
- Test credentials will be provided by JazzCash

### 4. Production Mode

For production:
- Set `NODE_ENV=production` in `.env`
- Use production URL: https://payments.jazzcash.com.pk/
- Use real merchant credentials

## API Endpoints

### 1. Initiate Payment
```
POST /api/jazzcash/initiate
Authorization: Bearer <token>

Request Body:
{
  "orderId": 123,
  "customerMobile": "03001234567"
}

Response:
{
  "success": true,
  "paymentUrl": "https://payments.jazzcash.com.pk/...",
  "paymentData": {
    "pp_Version": "1.1",
    "pp_TxnType": "MWALLET",
    ...
  },
  "orderId": 123,
  "amount": 5000
}
```

### 2. Payment Callback (Webhook)
```
POST /api/jazzcash/callback

Request Body: (Sent by JazzCash)
{
  "pp_ResponseCode": "000",
  "pp_ResponseMessage": "Success",
  "pp_BillReference": "123",
  "pp_TxnRefNo": "T1234567890",
  "pp_SecureHash": "...",
  ...
}

Response:
{
  "success": true,
  "message": "Payment successful",
  "orderId": 123,
  "transactionId": "T1234567890"
}
```

### 3. Get Payment Status
```
GET /api/jazzcash/status/:orderId
Authorization: Bearer <token>

Response:
{
  "orderId": 123,
  "status": "PROCESSING",
  "transactionId": "T1234567890",
  "amount": 5000
}
```

### 4. Verify Transaction
```
GET /api/jazzcash/verify/:txnRefNo
Authorization: Bearer <token>

Response:
{
  "orderId": 123,
  "transactionId": "T1234567890",
  "status": { ... },
  "orderStatus": "PROCESSING"
}
```

### 5. Refund Payment
```
POST /api/jazzcash/refund/:orderId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Refund processed successfully",
  "orderId": 123,
  "refundAmount": 5000
}
```

## Frontend Integration

### 1. Import Component
```tsx
import JazzCashPayment from '@/components/JazzCashPayment';
```

### 2. Use Component
```tsx
<JazzCashPayment
  orderId={order.id}
  amount={order.total}
  onSuccess={() => console.log('Payment initiated')}
  onError={(error) => console.error(error)}
/>
```

### 3. Callback Page
The callback page is automatically created at:
```
/payment/jazzcash/callback
```

## Payment Flow

1. **Customer initiates payment**
   - Enters mobile number
   - Clicks "Pay with JazzCash"

2. **Backend creates payment request**
   - Validates order and mobile number
   - Generates secure hash
   - Returns payment URL and data

3. **Frontend redirects to JazzCash**
   - Creates form with payment data
   - Submits to JazzCash gateway

4. **Customer completes payment**
   - Enters JazzCash PIN
   - Confirms transaction

5. **JazzCash redirects back**
   - Sends payment response to callback URL
   - Backend verifies hash and updates order

6. **Customer sees result**
   - Success: Redirected to orders page
   - Failed: Option to retry

## Security Features

### 1. Hash Generation
- Uses HMAC SHA256 algorithm
- Includes integrity salt
- Prevents tampering with payment data

### 2. Response Verification
- Validates secure hash from JazzCash
- Checks response code
- Prevents fraudulent callbacks

### 3. Mobile Number Validation
- Pakistani format: 03XXXXXXXXX
- 11 digits required
- Prevents invalid numbers

### 4. Order Validation
- Checks order ownership
- Prevents duplicate payments
- Validates order status

## Response Codes

Common JazzCash response codes:

| Code | Description |
|------|-------------|
| 000  | Success |
| 001  | Account Blocked |
| 002  | Account Not Found |
| 003  | Insufficient Balance |
| 004  | Transaction Declined |
| 005  | Invalid PIN |
| 006  | Transaction Timeout |
| 007  | Invalid Amount |
| 008  | Invalid Mobile Number |
| 009  | Transaction Already Processed |
| 010  | System Error |

## Testing

### 1. Test Mobile Numbers
JazzCash provides test mobile numbers for sandbox:
- 03001234567 (Success)
- 03001234568 (Insufficient Balance)
- 03001234569 (Invalid PIN)

### 2. Test Amounts
- Any amount works in sandbox
- Minimum: PKR 10
- Maximum: PKR 1,000,000

### 3. Test PIN
- Use any 5-digit PIN in sandbox
- Production requires real JazzCash PIN

## Troubleshooting

### Issue: Invalid Hash Error
**Solution:** 
- Verify integrity salt is correct
- Check all parameters are included
- Ensure parameters are sorted correctly

### Issue: Transaction Timeout
**Solution:**
- Increase transaction expiry time
- Check network connectivity
- Verify JazzCash API is accessible

### Issue: Mobile Number Invalid
**Solution:**
- Ensure format is 03XXXXXXXXX
- Check number is 11 digits
- Verify number is registered with JazzCash

### Issue: Payment Not Updating Order
**Solution:**
- Check callback URL is accessible
- Verify webhook is receiving data
- Check database connection

## Production Checklist

Before going live:

- [ ] Get production credentials from JazzCash
- [ ] Update environment variables
- [ ] Set NODE_ENV=production
- [ ] Test with real mobile number
- [ ] Verify callback URL is accessible
- [ ] Test refund functionality
- [ ] Set up error monitoring
- [ ] Configure SSL certificate
- [ ] Test transaction inquiry
- [ ] Document customer support process

## Support

### JazzCash Support
- Email: merchantsupport@jazzcash.com.pk
- Phone: 111-124-444
- Hours: 9 AM - 6 PM (Mon-Fri)

### Technical Documentation
- API Docs: https://sandbox.jazzcash.com.pk/documentation
- Integration Guide: Contact JazzCash support

## Files Modified/Created

### Backend
- `backend/src/services/jazzcashService.ts` - Payment service
- `backend/src/controllers/jazzcashController.ts` - Payment controller
- `backend/src/routes/jazzcashRoutes.ts` - API routes
- `backend/src/index.ts` - Route registration
- `backend/.env` - Environment variables

### Frontend
- `frontend/src/components/JazzCashPayment.tsx` - Payment component
- `frontend/src/app/payment/jazzcash/callback/page.tsx` - Callback page

## Next Steps

1. **Get Production Credentials**
   - Contact JazzCash business team
   - Submit required documents
   - Receive merchant credentials

2. **Update Configuration**
   - Add credentials to .env
   - Set production URLs
   - Configure callback URL

3. **Test Integration**
   - Test with sandbox first
   - Verify all flows work
   - Test error scenarios

4. **Go Live**
   - Switch to production mode
   - Monitor transactions
   - Set up alerts

5. **Monitor & Optimize**
   - Track success rates
   - Monitor errors
   - Optimize user experience

---

**Last Updated:** November 11, 2025
**Version:** 1.0.0
**Status:** Production Ready
