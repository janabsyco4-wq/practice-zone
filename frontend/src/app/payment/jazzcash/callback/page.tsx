'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function JazzCashCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [message, setMessage] = useState('Processing your payment...');
  const [orderId, setOrderId] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');

  useEffect(() => {
    // Get response parameters from URL
    const responseCode = searchParams.get('pp_ResponseCode');
    const responseMessage = searchParams.get('pp_ResponseMessage');
    const billReference = searchParams.get('pp_BillReference');
    const txnRefNo = searchParams.get('pp_TxnRefNo');

    if (billReference) {
      setOrderId(billReference);
    }

    if (txnRefNo) {
      setTransactionId(txnRefNo);
    }

    // Check payment status
    if (responseCode === '000') {
      setStatus('success');
      setMessage('Payment successful! Your order has been confirmed.');
      
      // Redirect to orders page after 3 seconds
      setTimeout(() => {
        router.push('/orders');
      }, 3000);
    } else {
      setStatus('failed');
      setMessage(responseMessage || 'Payment failed. Please try again.');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {status === 'processing' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            
            {orderId && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="text-lg font-semibold text-gray-900">#{orderId}</p>
              </div>
            )}

            {transactionId && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="text-sm font-mono text-gray-900">{transactionId}</p>
              </div>
            )}

            <Link
              href="/orders"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              View My Orders
            </Link>

            <p className="text-sm text-gray-500 mt-4">Redirecting to orders page...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>

            {orderId && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="text-lg font-semibold text-gray-900">#{orderId}</p>
              </div>
            )}

            <div className="space-y-3">
              <Link
                href={`/cart`}
                className="block w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Try Again
              </Link>
              <Link
                href="/orders"
                className="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                View Orders
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
