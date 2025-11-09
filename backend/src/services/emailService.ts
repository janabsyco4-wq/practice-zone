import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const getEmailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Calibri', Arial, sans-serif;
      background-color: #0a0a0f;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #1a1a24;
      border-radius: 12px;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: white;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
      color: #e5e7eb;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      padding: 30px;
      text-align: center;
      color: #9ca3af;
      font-size: 14px;
      border-top: 1px solid #24243a;
    }
    .order-item {
      background-color: #13131a;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      border: 1px solid #24243a;
    }
    h1 { color: #ffffff; margin: 0 0 20px 0; }
    h2 { color: #ffffff; margin: 20px 0 10px 0; }
    p { line-height: 1.6; margin: 10px 0; }
    .highlight { color: #8b5cf6; font-weight: bold; }
  </style>
</head>
<body>
  <div style="background-color: #0a0a0f; padding: 40px 20px;">
    <div class="container">
      <div class="header">
        <h1 class="logo">⚡ ShopAI</h1>
      </div>
      <div class="content">
        ${content}
      </div>
      <div class="footer">
        <p>© 2025 ShopAI. All rights reserved.</p>
        <p>AI-Powered E-Commerce Platform</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const sendWelcomeEmail = async (email: string, name: string) => {
  const content = `
    <h1>Welcome to ShopAI! 🎉</h1>
    <p>Hi <span class="highlight">${name}</span>,</p>
    <p>Thank you for joining ShopAI! We're excited to have you as part of our community.</p>
    <p>With ShopAI, you'll enjoy:</p>
    <ul style="color: #e5e7eb; line-height: 1.8;">
      <li>🤖 AI-powered product recommendations</li>
      <li>💳 Secure checkout with Stripe</li>
      <li>📦 Fast and reliable shipping</li>
      <li>🎁 Exclusive deals and offers</li>
    </ul>
    <p>Start exploring our amazing collection of products!</p>
    <center>
      <a href="${process.env.FRONTEND_URL}/products" class="button">Start Shopping</a>
    </center>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Happy shopping!<br>The ShopAI Team</p>
  `;

  try {
    await transporter.sendMail({
      from: `"ShopAI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to ShopAI! 🎉',
      html: getEmailTemplate(content),
    });
    console.log(`✅ Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
};

export const sendOrderConfirmationEmail = async (
  email: string,
  name: string,
  order: any
) => {
  const itemsList = order.items
    .map(
      (item: any) => `
    <div class="order-item">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: #ffffff;">${item.product.name}</strong><br>
          <span style="color: #9ca3af;">Quantity: ${item.quantity}</span>
        </div>
        <div style="color: #ffffff; font-weight: bold;">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  `
    )
    .join('');

  const content = `
    <h1>Order Confirmed! 🎉</h1>
    <p>Hi <span class="highlight">${name}</span>,</p>
    <p>Thank you for your order! We've received your payment and are preparing your items for shipment.</p>
    
    <h2>Order Details</h2>
    <p><strong>Order ID:</strong> <span class="highlight">#${order.id.slice(0, 8)}</span></p>
    <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}</p>
    
    <h2>Items Ordered</h2>
    ${itemsList}
    
    <div style="background-color: #13131a; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #24243a;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <span>Subtotal:</span>
        <span>$${order.total.toFixed(2)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <span>Shipping:</span>
        <span style="color: #10b981;">FREE</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px solid #24243a;">
        <strong style="font-size: 18px;">Total:</strong>
        <strong style="font-size: 18px; color: #8b5cf6;">$${order.total.toFixed(2)}</strong>
      </div>
    </div>
    
    <h2>Shipping Address</h2>
    <p style="color: #e5e7eb;">${order.shippingAddress}</p>
    
    <center>
      <a href="${process.env.FRONTEND_URL}/orders" class="button">View Order Status</a>
    </center>
    
    <p>We'll send you another email when your order ships.</p>
    <p>Thank you for shopping with us!<br>The ShopAI Team</p>
  `;

  try {
    await transporter.sendMail({
      from: `"ShopAI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Order Confirmation - #${order.id.slice(0, 8)}`,
      html: getEmailTemplate(content),
    });
    console.log(`✅ Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }
};

export const sendOrderStatusEmail = async (
  email: string,
  name: string,
  order: any,
  oldStatus: string,
  newStatus: string
) => {
  const statusMessages: any = {
    PROCESSING: {
      emoji: '⚙️',
      title: 'Order is Being Processed',
      message: 'Great news! We\'re preparing your order for shipment.',
    },
    SHIPPED: {
      emoji: '📦',
      title: 'Order Shipped!',
      message: 'Your order is on its way! You should receive it within 3-5 business days.',
    },
    DELIVERED: {
      emoji: '✅',
      title: 'Order Delivered!',
      message: 'Your order has been delivered. We hope you love your purchase!',
    },
    CANCELLED: {
      emoji: '❌',
      title: 'Order Cancelled',
      message: 'Your order has been cancelled. If you didn\'t request this, please contact support.',
    },
  };

  const statusInfo = statusMessages[newStatus] || {
    emoji: '📋',
    title: 'Order Status Updated',
    message: `Your order status has been updated to ${newStatus}.`,
  };

  const content = `
    <h1>${statusInfo.emoji} ${statusInfo.title}</h1>
    <p>Hi <span class="highlight">${name}</span>,</p>
    <p>${statusInfo.message}</p>
    
    <div style="background-color: #13131a; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #24243a;">
      <p><strong>Order ID:</strong> <span class="highlight">#${order.id.slice(0, 8)}</span></p>
      <p><strong>Status:</strong> <span style="color: #8b5cf6; font-weight: bold;">${newStatus}</span></p>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    </div>
    
    <center>
      <a href="${process.env.FRONTEND_URL}/orders" class="button">View Order Details</a>
    </center>
    
    <p>If you have any questions, please don't hesitate to contact us.</p>
    <p>Best regards,<br>The ShopAI Team</p>
  `;

  try {
    await transporter.sendMail({
      from: `"ShopAI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `${statusInfo.emoji} Order Update - #${order.id.slice(0, 8)}`,
      html: getEmailTemplate(content),
    });
    console.log(`✅ Order status email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send order status email:', error);
  }
};
