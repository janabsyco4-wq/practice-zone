'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CareersPage() {
  const positions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain our e-commerce platform using modern web technologies."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Lead product strategy and roadmap for our customer-facing applications."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create beautiful and intuitive user experiences for our platform."
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "New York, NY",
      type: "Full-time",
      description: "Help our customers succeed and ensure they have an amazing experience."
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive growth through creative marketing campaigns and strategies."
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      description: "Turn data into actionable insights to improve our business decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Join Our Team</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're building the future of e-commerce. Join us in creating amazing shopping experiences for millions of customers worldwide.
          </p>
        </div>
        
        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
            <p className="text-gray-400">We embrace new ideas and technologies to stay ahead.</p>
          </div>
          
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Collaboration</h3>
            <p className="text-gray-400">We work together to achieve extraordinary results.</p>
          </div>
          
          <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Excellence</h3>
            <p className="text-gray-400">We strive for excellence in everything we do.</p>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Competitive salary and equity</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Comprehensive health insurance</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Flexible remote work options</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Unlimited PTO</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Professional development budget</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>401(k) matching</span>
            </div>
          </div>
        </div>
        
        {/* Open Positions */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Open Positions</h2>
          <div className="space-y-4">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-dark-800 p-6 rounded-lg border border-dark-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{position.title}</h3>
                    <p className="text-gray-400 mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-dark-700 text-gray-300 rounded-full">
                        {position.location}
                      </span>
                      <span className="px-3 py-1 bg-dark-700 text-gray-300 rounded-full">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Don't see a perfect fit?</h2>
          <p className="text-gray-400 mb-6">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:careers@shopai.com"
            className="inline-block px-8 py-3 bg-dark-700 text-white rounded-lg font-semibold hover:bg-dark-600 transition-colors border border-dark-600"
          >
            Send Your Resume
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
