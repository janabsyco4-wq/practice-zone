const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class ApiClient {
  private getHeaders(token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // Auth
  async register(data: { email: string; password: string; name: string }) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async login(data: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  // Products
  async getProducts(params?: { category?: string; minPrice?: number; maxPrice?: number }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_URL}/products${query ? `?${query}` : ''}`);
    return res.json();
  }

  async searchProducts(q: string) {
    const res = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(q)}`);
    return res.json();
  }

  async getProduct(id: string) {
    const res = await fetch(`${API_URL}/products/${id}`);
    return res.json();
  }

  // Cart
  async getCart(token: string) {
    const res = await fetch(`${API_URL}/cart`, {
      headers: this.getHeaders(token),
    });
    return res.json();
  }

  async addToCart(token: string, data: { productId: string; quantity: number }) {
    const res = await fetch(`${API_URL}/cart/items`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async updateCartItem(token: string, itemId: string, quantity: number) {
    const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify({ quantity }),
    });
    return res.json();
  }

  async removeFromCart(token: string, itemId: string) {
    const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });
    return res.json();
  }

  // Payments
  async createPaymentIntent(token: string, amount: number) {
    const res = await fetch(`${API_URL}/payments/create-payment-intent`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ amount }),
    });
    return res.json();
  }

  async confirmPayment(token: string, paymentIntentId: string) {
    const res = await fetch(`${API_URL}/payments/confirm`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ paymentIntentId }),
    });
    return res.json();
  }

  // Orders
  async createOrder(token: string, data: { shippingAddress: string; stripePaymentId?: string }) {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async getOrders(token: string) {
    const res = await fetch(`${API_URL}/orders`, {
      headers: this.getHeaders(token),
    });
    return res.json();
  }

  async getOrder(token: string, id: string) {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      headers: this.getHeaders(token),
    });
    return res.json();
  }
}

export const api = new ApiClient();
