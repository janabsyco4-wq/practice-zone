'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface JazzCashPaymentProps {
  orderId: number;
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function JazzCashPayment({ orderId, amount, onSuccess, onError }: JazzCashPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate mobile number
    if (!/^03\d{9}$/.test(mobileNumber)) {
      setError('Please enter a valid Pakistani mobile number (03XXXXXXXXX)');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/jazzcash/initiate', {
        orderId,
        customerMobile: mobileNumber,
      });

      if (response.data.success) {
        // Create a form and submit it to JazzCash
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = response.data.paymentUrl;

        // Add all payment data as hidden inputs
        Object.keys(response.data.paymentData).forEach((key) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = response.data.paymentData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to initiate payment';
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">JC</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">JazzCash Payment</h3>
          <p className="text-sm text-gray-600">Pay securely with JazzCash Mobile Account</p>
        </div>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="03001234567"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
            maxLength={11}
            pattern="03\d{9}"
          />
          <p className="text-xs text-gray-500 mt-1">Enter your JazzCash registered mobile number</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount to Pay:</span>
            <span className="text-2xl font-bold text-gray-900">PKR {amount.toLocaleString()}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Pay with JazzCash'}
        </button>

        <div className="text-xs text-gray-500 text-center">
          <p>You will be redirected to JazzCash payment gateway</p>
          <p className="mt-1">Secure payment powered by JazzCash</p>
        </div>
      </form>
    </div>
  );
}
