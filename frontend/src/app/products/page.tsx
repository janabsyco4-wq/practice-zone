'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts(category ? { category } : {});
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadProducts();
      return;
    }
    setLoading(true);
    try {
      const data = await api.searchProducts(searchQuery);
      setProducts(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      
      <PageHero 
        title="Products"
        subtitle={`Discover our amazing collection of ${products.length} products`}
        gradient="purple"
        size="medium"
      />
      
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Back Button */}
        <div className="mb-8 animate-fade-in-up">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up delay-100">
          <div className="bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {products.length}+
            </div>
            <div className="text-sm text-gray-400">Products Available</div>
          </div>
          <div className="bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Free
            </div>
            <div className="text-sm text-gray-400">Shipping</div>
          </div>
          <div className="bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
          <div className="bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-sm text-gray-400">Secure</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 animate-fade-in-up delay-200">
          <form onSubmit={handleSearch} className="flex-1 relative group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all"
            />
            <svg 
              className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-purple-400 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  loadProducts();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-6 py-4 bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/5 transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-pulse">
                <div className="aspect-square bg-white/5 rounded-xl mb-4"></div>
                <div className="h-4 bg-white/5 rounded mb-2"></div>
                <div className="h-4 bg-white/5 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              <div className="relative w-full h-full bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">No Products Found</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking for
            </p>
            <button
              onClick={() => {
                setCategory('');
                setSearchQuery('');
                loadProducts();
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center gap-2"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product: any, index: number) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-16 relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
              <div className="relative bg-[#13131A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Can't Find What You're Looking For?
                  </h3>
                  <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                    Our AI assistant is here to help you discover the perfect products tailored to your needs
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>Chat with AI Assistant</span>
                    </button>
                    <Link href="/" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
