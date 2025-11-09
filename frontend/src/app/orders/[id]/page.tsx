'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import OrderTracking from '@/components/OrderTracking';
import { api } from '@/lib/api';
import { getToken, isAuthenticated } from '@/lib/auth';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    loadOrder();
  }, [params.id]);

  const loadOrder = async () => {
    try {
      const token = getToken()!;
      const data = await api.getOrder(token, params.id as string);
      setOrder(data);
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
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

  if (!order) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400 text-lg">Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      
      <PageHero 
        title="Order Details"
        subtitle={`Order #${order?.id.slice(0, 8)}`}
        gradient="blue"
        size="small"
      />
      
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="mb-8 animate-fade-in-up">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Orders</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-dark-800 rounded-xl p-6 border border-dark-600">
              <h2 className="text-2xl font-bold text-white mb-4">Order #{order.id.slice(0, 8)}</h2>
              
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-dark-600 last:border-0">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{item.product.name}</h3>
                      <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-gray-400 text-sm">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-dark-600 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold pt-2">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-dark-800 rounded-xl p-6 border border-dark-600">
              <h3 className="text-xl font-bold text-white mb-4">Shipping Address</h3>
              <p className="text-gray-300">{order.shippingAddress}</p>
            </div>
          </div>

          {/* Tracking */}
          <div className="lg:col-span-1">
            <OrderTracking
              status={order.status}
              trackingNumber={order.trackingNumber}
              carrier={order.carrier}
              estimatedDelivery={order.estimatedDelivery}
              createdAt={order.createdAt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
