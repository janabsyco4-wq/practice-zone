# JazzCash Quick Reference Card

## 🚀 Quick Commands

```bash
# Test integration
node backend/test-jazzcash.js

# Start development (sandbox)
npm run dev

# Start production (live)
NODE_ENV=production npm start
```

## 🔑 Environment Variables

```env
JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_PASSWORD=your_password
JAZZCASH_INTEGRITY_SALT=your_salt
JAZZCASH_RETURN_URL=https://your-domain.com/payment/jazzcash/callback
```

## 📡 API Endpoints

```
POST   /api/jazzcash/initiate          # Start payment
POST   /api/jazzcash/callback          # Webhook
GET    /api/jazzcash/status/:orderId   # Get status
GET    /api/jazzcash/verify/:txnRefNo  # Verify
POST   /api/jazzcash/refund/:orderId   # Refund
```

## 📱 Test Mobile Numbers

```
03001234567  → Success
03001234568  → Insufficient Balance
03001234569  → Invalid PIN
03001234570  → Declined
```

## 💰 Amount Format

```javascript
PKR 100    → 10000 paisa
PKR 1000   → 100000 paisa
PKR 5000   → 500000 paisa
```

## 🔐 Response Codes

```
000 → Success
001 → Account Blocked
002 → Account Not Found
003 → Insufficient Balance
004 → Transaction Declined
005 → Invalid PIN
```

## 📞 Support

```
Email: merchantsupport@jazzcash.com.pk
Phone: 111-124-444
Hours: 9 AM - 6 PM (Mon-Fri)
```

## 📚 Documentation

```
JAZZCASH_INTEGRATION.md   → Full technical guide
JAZZCASH_SETUP_GUIDE.md   → Setup instructions
JAZZCASH_SUMMARY.md       → Complete summary
```

## 🧪 Testing Flow

```
1. Add items to cart
2. Proceed to checkout
3. Select JazzCash
4. Enter mobile: 03001234567
5. Complete payment
6. Verify callback
```

## 🎯 Production Checklist

```
✓ Get credentials
✓ Update .env
✓ Set NODE_ENV=production
✓ Configure return URL
✓ Test with real mobile
✓ Verify SSL
✓ Monitor logs
```

## 🔧 URLs

```
Sandbox:    https://sandbox.jazzcash.com.pk/
Production: https://payments.jazzcash.com.pk/
```

---

**Quick Start:** Update `.env` → Run tests → Start server → Test payment
