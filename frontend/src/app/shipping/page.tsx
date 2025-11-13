'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8">Shipping Information</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Shipping Methods</h2>
            <p className="mb-4">We offer several shipping options to meet your needs:</p>
            
            <div className="space-y-4">
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-purple-400">Standard Shipping</h3>
                  <span className="text-white font-semibold">$5.99</span>
                </div>
                <p className="text-gray-400 mb-2">Delivery in 5-7 business days</p>
                <p className="text-sm text-gray-500">Free on orders over $50</p>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-purple-400">Express Shipping</h3>
                  <span className="text-white font-semibold">$12.99</span>
                </div>
                <p className="text-gray-400 mb-2">Delivery in 2-3 business days</p>
                <p className="text-sm text-gray-500">Available for most locations</p>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-purple-400">Overnight Shipping</h3>
                  <span className="text-white font-semibold">$24.99</span>
                </div>
                <p className="text-gray-400 mb-2">Next business day delivery</p>
                <p className="text-sm text-gray-500">Order by 2 PM for next-day delivery</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Processing Time</h2>
            <p className="mb-4">
              Orders are typically processed within 1-2 business days. You'll receive a confirmation email once your order ships with tracking information.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Orders placed before 2 PM EST ship the same business day</li>
              <li>Orders placed after 2 PM EST ship the next business day</li>
              <li>Weekend orders are processed on Monday</li>
              <li>Holiday processing times may vary</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Shipping Locations</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-3">Domestic Shipping</h3>
                <p className="text-gray-400 mb-3">We ship to all 50 US states, including:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                  <li>Alaska and Hawaii</li>
                  <li>US territories</li>
                  <li>APO/FPO addresses</li>
                  <li>PO Boxes (standard shipping only)</li>
                </ul>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-white mb-3">International Shipping</h3>
                <p className="text-gray-400 mb-3">We ship to over 100 countries worldwide:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                  <li>Canada: 7-10 business days</li>
                  <li>Europe: 10-15 business days</li>
                  <li>Asia: 12-20 business days</li>
                  <li>Other regions: 15-25 business days</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Order Tracking</h2>
            <p className="mb-4">Track your order easily:</p>
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <div>
                    <p className="text-white font-semibold">Check Your Email</p>
                    <p className="text-gray-400 text-sm">You'll receive a shipping confirmation with tracking number</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <div>
                    <p className="text-white font-semibold">Log Into Your Account</p>
                    <p className="text-gray-400 text-sm">View tracking information in your Order History</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <div>
                    <p className="text-white font-semibold">Track Your Package</p>
                    <p className="text-gray-400 text-sm">Click the tracking number to see real-time updates</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">International Orders</h2>
            <p className="mb-4">Important information for international customers:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Customs duties and taxes may apply and are the responsibility of the recipient</li>
              <li>Delivery times are estimates and may vary due to customs processing</li>
              <li>Some items may have shipping restrictions to certain countries</li>
              <li>International orders cannot be expedited</li>
              <li>All prices are in USD</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Shipping Restrictions</h2>
            <p className="mb-4">We cannot ship to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Countries under trade embargo</li>
              <li>Regions with active conflict</li>
              <li>Addresses flagged for fraud</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Delivery Issues</h2>
            <p className="mb-4">If you experience any delivery problems:</p>
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Package Not Received</p>
                    <p className="text-sm text-gray-400">Contact us within 7 days of expected delivery</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Damaged Package</p>
                    <p className="text-sm text-gray-400">Take photos and contact us immediately</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-white">Wrong Address</p>
                    <p className="text-sm text-gray-400">Contact us within 1 hour of placing order</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Shipping Support</h2>
            <p className="mb-4">
              Have questions about shipping? Our team is here to help.
            </p>
            <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
              <p>Email: shipping@shopai.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Hours: Monday-Friday, 9 AM - 6 PM EST</p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
