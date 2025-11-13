'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-lg">
            Welcome to our e-commerce platform, where innovation meets convenience. We're dedicated to providing you with the best online shopping experience, offering a wide range of high-quality products at competitive prices.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to make online shopping accessible, enjoyable, and secure for everyone. We believe in delivering exceptional value through carefully curated products, outstanding customer service, and a seamless shopping experience.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Wide selection of electronics, fashion, home goods, and more</li>
            <li>Competitive pricing and regular deals</li>
            <li>Secure payment processing</li>
            <li>Fast and reliable shipping</li>
            <li>Responsive customer support</li>
            <li>Easy returns and exchanges</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Quality</h3>
              <p className="text-gray-400">We carefully select products that meet our high standards for quality and durability.</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Trust</h3>
              <p className="text-gray-400">Your security and privacy are our top priorities. We use industry-standard encryption.</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Innovation</h3>
              <p className="text-gray-400">We continuously improve our platform to provide the best shopping experience.</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Customer First</h3>
              <p className="text-gray-400">Your satisfaction is our success. We're here to help every step of the way.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Contact Us</h2>
          <p>
            Have questions or feedback? We'd love to hear from you. Visit our <a href="/contact" className="text-purple-400 hover:text-purple-300">Contact page</a> to get in touch with our team.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
