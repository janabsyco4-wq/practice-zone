'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUser, removeToken, isAuthenticated, getToken } from '@/lib/auth';
import { api } from '@/lib/api';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      setUser(getUser());
      loadCartCount();
    }
  }, []);

  const loadCartCount = async () => {
    try {
      const token = getToken();
      if (token) {
        const cart = await api.getCart(token);
        const count = cart.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      }
    } catch (error) {
      console.error('Failed to load cart count:', error);
    }
  };

  const handleLogout = () => {
    removeToken();
    setUser(null);
    window.location.href = '/';
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:bg-white/30 transition-all"></div>
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">ShopAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/products" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium">
              Products
            </Link>
            {user && (
              <>
                <Link href="/cart" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium relative">
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link href="/orders" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium">
                  Orders
                </Link>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-400 hover:from-purple-600/30 hover:to-pink-600/30 rounded-lg transition-all font-semibold border border-purple-500/30">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-300 font-medium">{user.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium">
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
