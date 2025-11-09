'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductGallery from '@/components/ProductGallery';
import { api } from '@/lib/api';
import { getToken, isAuthenticated } from '@/lib/auth';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      const data = await api.getProduct(params.id as string);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    setAddingToCart(true);
    setMessage('');

    try {
      const token = getToken()!;
      await api.addToCart(token, { productId: product.id, quantity });
      setMessage('Added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400 text-lg">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <ProductGallery 
            images={product.images && product.images.length > 0 ? product.images : [product.image]} 
            productName={product.name}
          />

          {/* Product Info */}
          <div>
            <div className="text-sm text-purple-400 mb-2">{product.category}</div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.stock > 0 ? (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {message && (
              <div className={`mb-4 px-4 py-3 rounded-lg ${
                message.includes('success') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500' 
                  : 'bg-red-500/20 text-red-400 border border-red-500'
              }`}>
                {message}
              </div>
            )}

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-gray-300 font-medium">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-dark-700 text-white rounded-lg hover:bg-dark-600"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 bg-dark-700 text-white rounded-lg hover:bg-dark-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50"
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
