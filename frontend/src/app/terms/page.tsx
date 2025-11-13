'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: November 10, 2025</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this e-commerce platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Service</h2>
            <p className="mb-4">You agree to use our service only for lawful purposes. You must not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful code or malware</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the service for fraudulent purposes</li>
              <li>Impersonate another person or entity</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Account Registration</h2>
            <p className="mb-4">To make purchases, you must create an account. You agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Orders and Payments</h2>
            <p className="mb-4">When you place an order:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You make an offer to purchase products at the listed price</li>
              <li>We reserve the right to accept or decline your order</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment must be received before order processing</li>
              <li>All payments are processed securely through Stripe</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Shipping and Delivery</h2>
            <p>
              We aim to ship orders within 1-2 business days. Delivery times vary based on location and shipping method selected. We are not responsible for delays caused by shipping carriers or customs.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Returns and Refunds</h2>
            <p className="mb-4">Our return policy includes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>30-day return window for most items</li>
              <li>Items must be unused and in original packaging</li>
              <li>Refunds processed within 5-7 business days</li>
              <li>Return shipping costs may apply</li>
              <li>Some items may be non-returnable</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Product Information</h2>
            <p>
              We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions, colors, or other content is accurate, complete, or error-free.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property</h2>
            <p>
              All content on this site, including text, graphics, logos, and images, is the property of our company or our content suppliers and is protected by copyright and trademark laws.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p>
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Information</h2>
            <p>
              For questions about these terms, please contact us:
            </p>
            <div className="mt-4 p-4 bg-dark-800 rounded-lg border border-dark-700">
              <p>Email: legal@shopai.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
