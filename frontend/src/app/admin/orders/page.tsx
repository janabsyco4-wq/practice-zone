'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getToken, isAuthenticated, isAdmin } from '@/lib/auth';

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push('/');
      return;
    }
    loadOrders();
  }, [filter]);

  const loadOrders = async () => {
    try {
      const token = getToken()!;
      const url = filter 
        ? `${process.env.NEXT_PUBLIC_API_URL}/orders/all?status=${filter}`
        : `${process.env.NEXT_PUBLIC_API_URL}/orders/all`;
      
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const token = getToken()!;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      loadOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'PROCESSING': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'SHIPPED': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      case 'DELIVERED': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
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
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Manage Orders</h1>
            <p className="text-gray-400">{orders.length} orders total</p>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-dark-800 rounded-xl p-6 border border-dark-600">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white font-semibold mb-1">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Customer: {order.user.name} ({order.user.email})
                    </p>
                  </div>
                  
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(order.status)}`}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-gray-300 text-sm">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
