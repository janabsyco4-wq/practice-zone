'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import { api } from '@/lib/api';
import { getToken, isAuthenticated } from '@/lib/auth';

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    if (searchParams.get('success') === 'true') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }

    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = getToken()!;
      const data = await api.getOrders(token);
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-400';
      case 'PROCESSING': return 'bg-blue-500/20 text-blue-400';
      case 'SHIPPED': return 'bg-purple-500/20 text-purple-400';
      case 'DELIVERED': return 'bg-green-500/20 text-green-400';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
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
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      
      <PageHero 
        title="My Orders"
        subtitle="Track and manage your purchases"
        gradient="orange"
        size="small"
      />
      
      <div className="max-w-7xl mx-auto px-6 pb-12">

        {showSuccess && (
          <div className="mb-6 bg-green-500/20 border border-green-500 text-green-400 px-6 py-4 rounded-lg">
            🎉 Order placed successfully! Thank you for your purchase.
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-400 text-lg mb-6">No orders yet</p>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-dark-800 rounded-xl overflow-hidden border border-dark-600">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-white font-semibold mb-1">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {order.trackingNumber && (
                    <div className="mb-4 p-3 bg-dark-700 rounded-lg border border-dark-600">
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-400">Tracking:</span>
                        <span className="text-white font-mono font-semibold">{order.trackingNumber}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 mb-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-gray-300">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dark-600 pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Shipping Address:</p>
                      <p className="text-white text-sm">{order.shippingAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Total</p>
                      <p className="text-2xl font-bold text-white">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => router.push(`/orders/${order.id}`)}
                  className="w-full py-3 bg-dark-700 hover:bg-dark-600 text-white font-semibold transition-colors border-t border-dark-600"
                >
                  View Tracking Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
