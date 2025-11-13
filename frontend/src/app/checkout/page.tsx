'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JazzCashPayment from '@/components/JazzCashPayment';
import { api } from '@/lib/api';
import { getToken, isAuthenticated } from '@/lib/auth';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'jazzcash'>('jazzcash');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    loadCart();
  }, [router]);

  const loadCart = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const data = await api.getCart(token);
      setCart(data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode) {
      alert('Please fill in all shipping address fields');
      return;
    }

    setCreating(true);
    try {
      const token = getToken()!;
      const newOrder = await api.createOrder(token, shippingAddress);
      setOrder(newOrder);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F]">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0F]">
        <Navbar />
        <PageHero title="Checkout" subtitle="Complete your purchase" gradient="purple" size="small" />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-400 mb-6">Your cart is empty</p>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
          >
            Browse Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <PageHero title="Checkout" subtitle="Complete your purchase" gradient="purple" size="small" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="space-y-6">
            {/* Shipping Address */}
            {!order && (
              <div className="bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="Karachi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">State/Province</label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="Sindh"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="75500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                      <input
                        type="text"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="Pakistan"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            {order && (
              <div className="bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Select Payment Method</h2>
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">JC</span>
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold">JazzCash</div>
                        <div className="text-xs text-gray-400">Pay with JazzCash Mobile Account</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('stripe')}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'stripe'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">💳</span>
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold">Credit/Debit Card</div>
                        <div className="text-xs text-gray-400">Pay with Stripe (International)</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Payment Component */}
                {paymentMethod === 'jazzcash' && (
                  <JazzCashPayment
                    orderId={order.id}
                    amount={order.total}
                    onSuccess={() => console.log('Payment initiated')}
                    onError={(error) => alert(error)}
                  />
                )}

                {paymentMethod === 'stripe' && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
                    <p className="text-gray-400 mb-4">Stripe payment integration</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold">
                      Pay with Stripe
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.items.map((item: any) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{item.product.name}</div>
                      <div className="text-gray-400 text-xs">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-white font-semibold">${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-white text-lg font-bold border-t border-white/10 pt-3">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {!order ? (
                <button
                  onClick={handleCreateOrder}
                  disabled={creating}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {creating ? 'Creating Order...' : 'Continue to Payment'}
                </button>
              ) : (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <div className="text-green-400 font-semibold mb-1">Order Created!</div>
                  <div className="text-gray-400 text-sm">Order #{order.id}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
