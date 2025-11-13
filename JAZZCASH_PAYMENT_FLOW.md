# JazzCash Payment Flow Diagram

## 📊 Complete Payment Flow

```
┌─────────────┐
│  Customer   │
│   Browser   │
└──────┬──────┘
       │
       │ 1. Add to cart & checkout
       ▼
┌─────────────────────────────────────────────────────────┐
│              Frontend (Next.js)                         │
│  ┌────────────────────────────────────────────────┐    │
│  │  JazzCashPayment Component                     │    │
│  │  - Enter mobile number (03XXXXXXXXX)           │    │
│  │  - Display amount                              │    │
│  │  - Click "Pay with JazzCash"                   │    │
│  └────────────────────────────────────────────────┘    │
└──────┬──────────────────────────────────────────────────┘
       │
       │ 2. POST /api/jazzcash/initiate
       │    { orderId, customerMobile }
       ▼
┌─────────────────────────────────────────────────────────┐
│              Backend (Node.js/Express)                  │
│  ┌────────────────────────────────────────────────┐    │
│  │  jazzcashController.initiatePayment()          │    │
│  │  - Validate mobile number                      │    │
│  │  - Get order details                           │    │
│  │  - Check order status                          │    │
│  └────────────────────────────────────────────────┘    │
│                        │                                │
│                        ▼                                │
│  ┌────────────────────────────────────────────────┐    │
│  │  jazzcashService.createPaymentRequest()        │    │
│  │  - Generate transaction reference              │    │
│  │  - Format date/time                            │    │
│  │  - Convert amount to paisa                     │    │
│  │  - Generate secure hash (HMAC SHA256)          │    │
│  └────────────────────────────────────────────────┘    │
└──────┬──────────────────────────────────────────────────┘
       │
       │ 3. Return payment URL & data
       │    { paymentUrl, paymentData, orderId, amount }
       ▼
┌─────────────────────────────────────────────────────────┐
│              Frontend (Next.js)                         │
│  ┌────────────────────────────────────────────────┐    │
│  │  Create HTML form with payment data            │    │
│  │  - Add all pp_* parameters as hidden inputs    │    │
│  │  - Submit form to JazzCash gateway             │    │
│  └────────────────────────────────────────────────┘    │
└──────┬──────────────────────────────────────────────────┘
       │
       │ 4. Redirect to JazzCash
       ▼
┌─────────────────────────────────────────────────────────┐
│         JazzCash Payment Gateway                        │
│  ┌────────────────────────────────────────────────┐    │
│  │  Customer enters:                              │    │
│  │  - JazzCash Mobile Account Number              │    │
│  │  - JazzCash PIN                                │    │
│  │  - Confirms transaction                        │    │
│  └────────────────────────────────────────────────┘    │
│                        │                                │
│                        ▼                                │
│  ┌────────────────────────────────────────────────┐    │
│  │  Process Payment                               │    │
│  │  - Validate credentials                        │    │
│  │  - Check balance                               │    │
│  │  - Deduct amount                               │    │
│  │  - Generate response                           │    │
│  └────────────────────────────────────────────────┘    │
└──────┬──────────────────────────────────────────────────┘
       │
       │ 5. POST callback to return URL
       │    { pp_ResponseCode, pp_TxnRefNo, pp_SecureHash, ... }
       ▼
┌─────────────────────────────────────────────────────────┐
│              Backend (Node.js/Express)                  │
│  ┌────────────────────────────────────────────────┐    │
│  │  jazzcashController.handlePaymentCallback()    │    │
│  │  - Receive payment response                    │    │
│  │  - Log callback data                           │    │
│  └────────────────────────────────────────────────┘    │
│                        │                                │
│                        ▼                                │
│  ┌────────────────────────────────────────────────┐    │
│  │  jazzcashService.verifyPaymentResponse()       │    │
│  │  - Verify secure hash                          │    │
│  │  - Check response code (000 = success)         │    │
│  └────────────────────────────────────────────────┘    │
│                        │                                │
│                        ▼                                │
│  ┌────────────────────────────────────────────────┐    │
│  │  Update Order in Database                      │    │
│  │  - Set status to PROCESSING (success)          │    │
│  │  - Set status to CANCELLED (failed)            │    │
│  │  - Store transaction reference                 │    │
│  └────────────────────────────────────────────────┘    │
└──────┬──────────────────────────────────────────────────┘
       │
       │ 6. Redirect customer to callback page
       │    /payment/jazzcash/callback?pp_ResponseCode=000&...
       ▼
┌─────────────────────────────────────────────────────────┐
│              Frontend (Next.js)                         │
│  ┌────────────────────────────────────────────────┐    │
│  │  Callback Page                                 │    │
│  │  - Parse URL parameters                        │    │
│  │  - Display success/failure message             │    │
│  │  - Show order ID & transaction ID              │    │
│  │  - Auto-redirect to orders page (3 seconds)    │    │
│  └────────────────────────────────────────────────┘    │
└──────┬──────────────────────────────────────────────────┘
       │
       │ 7. View order status
       ▼
┌─────────────┐
│  Customer   │
│   Orders    │
│    Page     │
└─────────────┘
```

## 🔄 Alternative Flows

### ❌ Payment Failed Flow

```
JazzCash Gateway
       │
       │ Response Code ≠ 000
       ▼
Backend Callback
       │
       │ Update order status to CANCELLED
       ▼
Callback Page
       │
       │ Show error message
       │ Offer retry option
       ▼
Customer can retry or view orders
```

### 🔍 Transaction Verification Flow

```
Customer/Admin
       │
       │ GET /api/jazzcash/verify/:txnRefNo
       ▼
Backend
       │
       │ Query JazzCash API
       ▼
JazzCash Gateway
       │
       │ Return transaction status
       ▼
Backend
       │
       │ Return status to customer
       ▼
Display transaction details
```

### 💸 Refund Flow

```
Admin
       │
       │ POST /api/jazzcash/refund/:orderId
       ▼
Backend
       │
       │ Validate order & permissions
       │ Call refundTransaction()
       ▼
JazzCash Gateway
       │
       │ Process refund
       │ Return response
       ▼
Backend
       │
       │ Update order status to CANCELLED
       │ Log refund
       ▼
Notify customer
```

## 📋 Data Flow Details

### 1. Payment Initiation Request

```json
{
  "orderId": 123,
  "customerMobile": "03001234567"
}
```

### 2. Payment Data to JazzCash

```json
{
  "pp_Version": "1.1",
  "pp_TxnType": "MWALLET",
  "pp_Language": "EN",
  "pp_MerchantID": "MC12345",
  "pp_Password": "password",
  "pp_TxnRefNo": "T1731337200000",
  "pp_Amount": "500000",
  "pp_TxnCurrency": "PKR",
  "pp_TxnDateTime": "20251111143000",
  "pp_BillReference": "123",
  "pp_Description": "Order #123 - 3 items",
  "pp_TxnExpiryDateTime": "20251111153000",
  "pp_ReturnURL": "https://domain.com/payment/jazzcash/callback",
  "pp_SecureHash": "ABC123...",
  "ppmpf_1": "customer@email.com",
  "ppmpf_2": "03001234567"
}
```

### 3. JazzCash Callback Response

```json
{
  "pp_ResponseCode": "000",
  "pp_ResponseMessage": "Success",
  "pp_BillReference": "123",
  "pp_TxnRefNo": "T1731337200000",
  "pp_Amount": "500000",
  "pp_SecureHash": "XYZ789...",
  "pp_TxnDateTime": "20251111143045"
}
```

### 4. Order Status Update

```javascript
{
  status: "PROCESSING",  // or "CANCELLED"
  stripePaymentId: "T1731337200000"
}
```

## ⏱️ Timing & Timeouts

```
Payment Initiation:     < 1 second
JazzCash Processing:    5-30 seconds
Callback Response:      < 2 seconds
Total Flow:             10-35 seconds
Transaction Expiry:     1 hour
```

## 🔐 Security Checkpoints

```
1. ✓ Mobile number validation (frontend)
2. ✓ Order ownership check (backend)
3. ✓ Duplicate payment check (backend)
4. ✓ Secure hash generation (backend)
5. ✓ Hash verification (JazzCash)
6. ✓ Callback hash verification (backend)
7. ✓ Response code validation (backend)
8. ✓ Order status validation (backend)
```

## 📊 Status Transitions

```
Order Created
    │
    ▼
PENDING ──────────────┐
    │                 │
    │ Payment Success │ Payment Failed
    ▼                 ▼
PROCESSING        CANCELLED
    │
    │ Admin ships
    ▼
SHIPPED
    │
    │ Customer receives
    ▼
DELIVERED
```

## 🎯 Success Criteria

```
✓ Response code = 000
✓ Hash verification passed
✓ Order status updated
✓ Transaction ID stored
✓ Customer redirected
✓ Email notification sent (optional)
```

## 🚨 Error Handling

```
Invalid Mobile      → Show error, don't submit
Order Not Found     → Return 404
Unauthorized        → Return 403
Hash Mismatch       → Return 400, log error
Payment Failed      → Update status, show error
Network Timeout     → Retry, show error
```

## 📱 Mobile Experience

```
1. Customer on mobile device
2. Enters mobile number
3. Redirects to JazzCash app (if installed)
4. Or opens JazzCash mobile web
5. Enters PIN
6. Confirms payment
7. Returns to merchant app/web
8. Sees success message
```

---

**Flow Status:** ✅ Complete & Tested
**Security:** ✅ Hash-based verification
**User Experience:** ✅ Seamless & fast
