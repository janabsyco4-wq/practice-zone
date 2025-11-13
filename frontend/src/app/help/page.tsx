'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also view tracking information in your Order History by logging into your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards through our secure Stripe payment processor."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight shipping options are available at checkout."
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 1 hour of placement. After that, the order enters processing and cannot be cancelled. Contact us immediately if you need to cancel."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times vary by location (typically 10-20 business days). Customs fees may apply."
    },
    {
      question: "How do I return an item?",
      answer: "Visit our Returns page for detailed instructions. Most items can be returned within 30 days. Log into your account to initiate a return."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, all payment information is encrypted and processed through Stripe, a PCI-compliant payment processor. We never store your credit card details."
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page. Enter your email address and we'll send you a password reset link."
    },
    {
      question: "Can I change my shipping address?",
      answer: "Shipping addresses can only be changed before the order ships. Contact us immediately if you need to update your address."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Currently, we don't offer gift wrapping services. However, all orders come in discreet packaging without pricing information."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8">Help Center</h1>
        
        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <a href="/orders" className="bg-dark-800 p-6 rounded-lg border border-dark-700 hover:border-purple-500 transition-colors">
            <svg className="w-8 h-8 text-purple-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">Track Order</h3>
            <p className="text-gray-400 text-sm">View your order status and tracking</p>
          </a>
          
          <a href="/returns" className="bg-dark-800 p-6 rounded-lg border border-dark-700 hover:border-purple-500 transition-colors">
            <svg className="w-8 h-8 text-purple-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">Returns</h3>
            <p className="text-gray-400 text-sm">Start a return or exchange</p>
          </a>
          
          <a href="/contact" className="bg-dark-800 p-6 rounded-lg border border-dark-700 hover:border-purple-500 transition-colors">
            <svg className="w-8 h-8 text-purple-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
            <p className="text-gray-400 text-sm">Get in touch with support</p>
          </a>
        </div>
        
        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-dark-700 transition-colors"
                >
                  <span className="text-white font-semibold">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-purple-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="mt-12 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-6">
            Our customer support team is available Monday-Friday, 9 AM - 6 PM EST
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@shopai.com"
              className="px-6 py-3 bg-dark-700 text-white rounded-lg font-semibold hover:bg-dark-600 transition-colors border border-dark-600"
            >
              Email Us
            </a>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
