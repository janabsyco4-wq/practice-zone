'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import StripeCheckout from '@/components/StripeCheckout';
import { api } from '@/lib/api';
import { getToken, isAuthenticated } from '@/lib/auth';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const token = getToken()!;
      const data = await api.getCart(token);
      if (!data.items || data.items.length === 0) {
        router.push('/cart');
        return;
      }
      setCart(data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      const token = getToken()!;
      const { clientSecret } = await api.createPaymentIntent(token, cart.total);
      setClientSecret(clientSecret);
      setShowPayment(true);
    } catch (err) {
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setProcessing(true);
    try {
      const token = getToken()!;
      await api.createOrder(token, { shippingAddress, stripePaymentId: paymentIntentId });
      router.push('/orders?success=true');
    } catch (err) {
      setError('Payment succeeded but order creation failed. Please contact support.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
    setShowPayment(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping Form / Payment */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-600">
            {!showPayment ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
                
                <form onSubmit={handleContinueToPayment} className="space-y-4">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Address
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50"
                  >
                    {processing ? 'Loading...' : 'Continue to Payment'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                <StripeCheckout
                  clientSecret={clientSecret}
                  amount={cart.total}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />

                <button
                  onClick={() => setShowPayment(false)}
                  className="w-full mt-4 py-3 bg-dark-700 text-white rounded-lg font-semibold hover:bg-dark-600 transition-all"
                >
                  Back to Shipping
                </button>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-600">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart?.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-gray-300">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dark-600 pt-4 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${cart?.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-white text-xl font-bold">
                <span>Total</span>
                <span>${cart?.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
