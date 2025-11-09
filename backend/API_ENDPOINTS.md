# API Endpoints Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

## Products

### Get All Products
```http
GET /products
GET /products?category=Electronics
GET /products?minPrice=50&maxPrice=500
```

### Search Products
```http
GET /products/search?q=headphones
```

### Get Product by ID
```http
GET /products/:id
```

### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "stock": 50
}
```

### Update Product (Admin Only)
```http
PUT /products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 89.99,
  "stock": 45
}
```

### Delete Product (Admin Only)
```http
DELETE /products/:id
Authorization: Bearer {token}
```

## Cart

### Get Cart
```http
GET /cart
Authorization: Bearer {token}
```

### Add to Cart
```http
POST /cart/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /cart/items/:itemId
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /cart/items/:itemId
Authorization: Bearer {token}
```

### Clear Cart
```http
DELETE /cart
Authorization: Bearer {token}
```

## Orders

### Create Order
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shippingAddress": "123 Main St, City, State 12345",
  "stripePaymentId": "pi_xxxxxxxxxxxxx"
}
```

### Get User Orders
```http
GET /orders
Authorization: Bearer {token}
```

### Get Order by ID
```http
GET /orders/:id
Authorization: Bearer {token}
```

### Get All Orders (Admin Only)
```http
GET /orders/all
GET /orders/all?status=PENDING
Authorization: Bearer {token}
```

### Update Order Status (Admin Only)
```http
PUT /orders/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "SHIPPED"
}
```

Order statuses: `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`

## Error Responses

All endpoints may return these error responses:

```json
{
  "error": "Error message"
}
```

Status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
