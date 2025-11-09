# Backend Setup

## Database Setup

### Option 1: Local MongoDB

1. Install MongoDB if you haven't already: https://www.mongodb.com/try/download/community

2. Start MongoDB service

3. Copy `.env.example` to `.env` and update the DATABASE_URL:
```
DATABASE_URL=mongodb://localhost:27017/ai_ecommerce
```

### Option 2: MongoDB Atlas (Cloud - Recommended)

1. Create a free account at https://www.mongodb.com/cloud/atlas

2. Create a new cluster

3. Get your connection string and update `.env`:
```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ai_ecommerce?retryWrites=true&w=majority
```

### Generate Prisma Client

```bash
npm run prisma:generate
```

Note: MongoDB with Prisma doesn't use migrations. The schema is applied automatically.

5. (Optional) Seed the database:
```bash
npm run seed
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products (Coming soon)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart (Coming soon)
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove cart item

### Orders (Coming soon)
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

### AI (Coming soon)
- `POST /api/ai/chat` - Chat with AI assistant
- `GET /api/ai/recommendations` - Get product recommendations
