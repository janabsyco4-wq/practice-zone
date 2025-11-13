'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: November 10, 2025</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Essential Cookies</h3>
                <p className="text-gray-400 mb-2">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <p className="text-sm text-gray-500">Examples: Session cookies, authentication cookies</p>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Functional Cookies</h3>
                <p className="text-gray-400 mb-2">
                  These cookies allow us to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
                </p>
                <p className="text-sm text-gray-500">Examples: Language preferences, shopping cart contents</p>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Analytics Cookies</h3>
                <p className="text-gray-400 mb-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <p className="text-sm text-gray-500">Examples: Google Analytics, page view tracking</p>
              </div>
              
              <div className="bg-dark-800 p-6 rounded-lg border border-dark-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Marketing Cookies</h3>
                <p className="text-gray-400 mb-2">
                  These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
                </p>
                <p className="text-sm text-gray-500">Examples: Retargeting pixels, ad performance tracking</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Cookies</h2>
            <p className="mb-4">We use services from third-party companies that may set cookies on your device:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Google Analytics - for website analytics</li>
              <li>Stripe - for payment processing</li>
              <li>Social media platforms - for social sharing features</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Managing Cookies</h2>
            <p className="mb-4">You have several options for managing cookies:</p>
            
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">Browser Settings</h3>
              <p className="mb-3">Most browsers allow you to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>View what cookies are stored and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
            </div>
            
            <p className="text-sm text-gray-400">
              Note: Blocking or deleting cookies may impact your experience on our website and limit certain features.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookie Duration</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <h3 className="font-semibold text-white mb-2">Session Cookies</h3>
                <p className="text-gray-400 text-sm">Temporary cookies that expire when you close your browser</p>
              </div>
              <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                <h3 className="font-semibold text-white mb-2">Persistent Cookies</h3>
                <p className="text-gray-400 text-sm">Remain on your device for a set period or until you delete them</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Consent</h2>
            <p>
              By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings or contacting us.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Updates to This Policy</h2>
            <p>
              We may update this cookie policy from time to time to reflect changes in technology, legislation, or our business practices. Please check this page periodically for updates.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
              <p>Email: privacy@shopai.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </section>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Useful Resources</h3>
            <p className="text-gray-300 mb-3">Learn more about cookies and how to manage them:</p>
            <ul className="space-y-2 text-purple-400">
              <li>• <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">AllAboutCookies.org</a></li>
              <li>• <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">YourOnlineChoices.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
