'use client';

import Link from 'next/link';

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
      <div className="bg-[#13131A] rounded-xl overflow-hidden border border-[#24243A] hover:border-purple-500/50 transition-colors">
        {/* Compact Image */}
        <div className="relative h-48 overflow-hidden bg-[#1A1A24]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';
            }}
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

          {/* View Button */}
          <button className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
