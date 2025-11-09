'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-[#13131A] rounded-xl overflow-hidden border border-[#24243A] hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
        {/* Compact Image */}
        <div className="relative h-48 overflow-hidden bg-[#1A1A24]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Category Badge - Top Left */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/10">
              {product.category}
            </span>
          </div>

          {/* Stock Badge - Top Right */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                {product.stock} left
              </span>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        {/* Compact Content */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors leading-snug">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>

          {/* Quick Info */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">4.5</span>
              <span>(128)</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>In Stock</span>
            </div>
          </div>

          {/* View Button */}
          <button className="w-full py-2 bg-purple-600/10 hover:bg-purple-600 text-purple-400 hover:text-white rounded-lg text-sm font-semibold transition-all duration-300 border border-purple-500/20 hover:border-purple-500">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
