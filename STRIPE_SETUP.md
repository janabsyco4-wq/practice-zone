# Stripe Payment Setup Guide

## Step 1: Create Stripe Account

1. Go to: https://dashboard.stripe.com/register
2. Sign up for free (no credit card needed for testing)
3. Complete the registration

## Step 2: Get API Keys

1. Go to: https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - Click "Reveal test key"

## Step 3: Update Environment Variables

### Backend (.env)

Open `backend/.env` and update:
```
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

### Frontend (.env)

Open `frontend/.env` and add:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
```

## Step 4: Restart Servers

Close both server windows and run:
```
start-dev.bat
```

Or use:
```
restart-servers.bat
```

## Step 5: Test Payment

1. Go to http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Enter shipping address
5. Click "Continue to Payment"
6. Use Stripe test cards:

### Test Card Numbers

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Declined Payment:**
- Card: `4000 0000 0000 0002`

**Requires Authentication (3D Secure):**
- Card: `4000 0025 0000 3155`

## Step 6: View Payments in Stripe Dashboard

1. Go to: https://dashboard.stripe.com/test/payments
2. You'll see all test payments
3. Click on any payment to see details

## Features Implemented

✅ Secure payment processing with Stripe
✅ Payment Intent API for better security
✅ Dark themed Stripe Elements
✅ Test mode for development
✅ Payment confirmation before order creation
✅ Error handling for failed payments
✅ PCI compliant (Stripe handles card data)

## Production Deployment

When ready for production:

1. **Activate your Stripe account:**
   - Complete business verification
   - Add bank account details

2. **Switch to live keys:**
   - Get live keys from: https://dashboard.stripe.com/apikeys
   - Update both `.env` files with live keys (remove `_test_`)

3. **Enable webhooks** (optional but recommended):
   - Go to: https://dashboard.stripe.com/webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

## Security Notes

- ✅ Card details never touch your server
- ✅ Stripe handles PCI compliance
- ✅ Payment Intent API prevents duplicate charges
- ✅ Client secret is single-use only
- ✅ All communication is encrypted

## Troubleshooting

**"Stripe is not defined" error:**
- Make sure you added `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `frontend/.env`
- Restart the frontend server

**"Invalid API Key" error:**
- Check that you copied the full key (starts with `sk_test_` or `pk_test_`)
- Make sure there are no spaces or quotes around the key

**Payment not processing:**
- Check browser console for errors
- Verify both API keys are set correctly
- Make sure you're using test card numbers in test mode

## Support

- Stripe Documentation: https://stripe.com/docs
- Test Cards: https://stripe.com/docs/testing
- API Reference: https://stripe.com/docs/api
