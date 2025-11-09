# Email Notifications Setup Guide

## Overview

Your platform now sends beautiful HTML emails for:
- ✅ Welcome emails when users register
- ✅ Order confirmation after purchase
- ✅ Order status updates (Processing, Shipped, Delivered)

## Setup Options

### Option 1: Gmail (Easiest for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "ShopAI"
   - Copy the 16-character password

3. **Update `backend/.env`**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
```

### Option 2: SendGrid (Recommended for Production)

1. **Create SendGrid Account**:
   - Go to: https://signup.sendgrid.com/
   - Free tier: 100 emails/day

2. **Create API Key**:
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the API key

3. **Update `backend/.env`**:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### Option 3: Mailtrap (Best for Development)

1. **Create Mailtrap Account**:
   - Go to: https://mailtrap.io/register/signup
   - Free tier: unlimited test emails

2. **Get SMTP Credentials**:
   - Go to Email Testing → Inboxes → My Inbox
   - Copy SMTP credentials

3. **Update `backend/.env`**:
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
```

## Restart Backend

After updating `.env`, restart the backend server:
```
restart-servers.bat
```

## Test Email Notifications

### 1. Welcome Email
- Register a new account
- Check your email inbox

### 2. Order Confirmation
- Place an order
- Check for confirmation email with order details

### 3. Status Update
- Login as admin (`admin@shopai.com` / `admin123`)
- Go to Admin → Manage Orders
- Change an order status
- Check customer's email

## Email Templates

All emails feature:
- 🎨 Dark theme matching your platform
- 📱 Mobile responsive design
- 🔗 Call-to-action buttons
- ✨ Beautiful gradients
- 📋 Order details and summaries

## Troubleshooting

**Emails not sending:**
- Check SMTP credentials in `.env`
- Verify backend server restarted
- Check backend console for errors
- For Gmail: Make sure App Password is correct

**Gmail "Less secure app" error:**
- Use App Password (not regular password)
- Enable 2-Factor Authentication first

**Emails going to spam:**
- Use a verified domain (production)
- Use SendGrid or similar service
- Add SPF/DKIM records

## Production Recommendations

For production deployment:

1. **Use a professional email service**:
   - SendGrid (100 emails/day free)
   - Mailgun (5,000 emails/month free)
   - AWS SES (62,000 emails/month free)

2. **Use your own domain**:
   - `noreply@yourdomain.com`
   - Add SPF, DKIM, DMARC records

3. **Add email templates**:
   - Password reset
   - Shipping tracking
   - Review requests
   - Promotional emails

## Email Features

### Welcome Email
- Personalized greeting
- Platform features overview
- Call-to-action button
- Support information

### Order Confirmation
- Order ID and date
- Itemized list with prices
- Total amount
- Shipping address
- View order button

### Status Updates
- Status-specific messages
- Order summary
- Tracking information (when shipped)
- Support contact

## Next Steps

Want to add more email types?
- Password reset emails
- Shipping tracking updates
- Review request emails
- Promotional campaigns
- Abandoned cart reminders

Let me know what you'd like to add!
