'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8">Returns & Exchanges</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Return Policy</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a hassle-free 30-day return policy for most items.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Eligibility</h2>
            <p className="mb-4">To be eligible for a return, items must meet the following conditions:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Returned within 30 days of delivery</li>
              <li>Unused and in original condition</li>
              <li>In original packaging with all tags attached</li>
              <li>Include proof of purchase (order number or receipt)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Non-Returnable Items</h2>
            <p className="mb-4">The following items cannot be returned:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Opened software or digital products</li>
              <li>Personal care items</li>
              <li>Perishable goods</li>
              <li>Custom or personalized items</li>
              <li>Gift cards</li>
              <li>Final sale items</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How to Return an Item</h2>
            <div className="space-y-4">
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Step 1: Initiate Return</h3>
                <p>Log into your account and go to Order History. Select the order and click "Return Item".</p>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Step 2: Print Label</h3>
                <p>Print the prepaid return shipping label provided in your return confirmation email.</p>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Step 3: Pack Item</h3>
                <p>Securely pack the item in its original packaging. Include all accessories and documentation.</p>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Step 4: Ship</h3>
                <p>Drop off the package at any authorized shipping location. Keep your tracking number.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Refunds</h2>
            <p className="mb-4">Once we receive your return:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We'll inspect the item within 2-3 business days</li>
              <li>If approved, refund will be processed to your original payment method</li>
              <li>Refunds typically appear within 5-7 business days</li>
              <li>You'll receive an email confirmation when refund is processed</li>
              <li>Original shipping costs are non-refundable</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Exchanges</h2>
            <p>
              We currently don't offer direct exchanges. If you need a different size, color, or item, please return the original item for a refund and place a new order.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Damaged or Defective Items</h2>
            <p className="mb-4">If you receive a damaged or defective item:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide photos of the damage</li>
              <li>We'll arrange a free return and send a replacement</li>
              <li>Or receive a full refund including shipping costs</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">International Returns</h2>
            <p>
              International customers are responsible for return shipping costs. We recommend using a trackable shipping service. Customs duties and taxes are non-refundable.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Need Help?</h2>
            <p>
              Have questions about returns? Our customer service team is here to help.
            </p>
            <div className="mt-4 p-4 bg-dark-800 rounded-lg border border-dark-700">
              <p>Email: returns@shopai.com</p>
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
