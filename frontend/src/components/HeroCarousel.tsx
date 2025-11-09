'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  gradient: string;
  accentGradient: string;
  icon: JSX.Element;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Shop Smarter',
    subtitle: 'With AI Technology',
    description: 'Experience the future of e-commerce with personalized recommendations, instant support, and seamless checkout powered by artificial intelligence',
    cta: 'Browse Products',
    ctaLink: '/products',
    gradient: 'from-purple-600/30 via-pink-600/20 to-transparent',
    accentGradient: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Exclusive Deals',
    subtitle: 'Up to 50% Off',
    description: 'Discover amazing products at unbeatable prices. Limited time offers on premium brands with free shipping on orders over $50',
    cta: 'Shop Now',
    ctaLink: '/products',
    gradient: 'from-blue-600/30 via-purple-600/20 to-transparent',
    accentGradient: 'from-blue-500 to-purple-500',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'New Arrivals',
    subtitle: 'Fresh Collection 2024',
    description: 'Check out the latest products just added to our store. Be the first to discover trending items and exclusive launches',
    cta: 'Explore Now',
    ctaLink: '/products',
    gradient: 'from-orange-600/30 via-pink-600/20 to-transparent',
    accentGradient: 'from-orange-500 to-pink-500',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative h-[600px] overflow-hidden bg-[#0A0A0F]">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated Gradient Orbs */}
              <div className={`absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br ${slide.gradient} rounded-full blur-3xl opacity-50 animate-float`}></div>
              <div className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr ${slide.gradient} rounded-full blur-3xl opacity-40 animate-float`} style={{ animationDelay: '1s' }}></div>
              
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
                {/* Left Column - Text */}
                <div className="space-y-6">
                  <div className="animate-fade-in-up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-semibold text-white">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                      Featured
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in-up delay-100 leading-tight">
                    {slide.title}
                    <span className={`block bg-gradient-to-r ${slide.accentGradient} bg-clip-text text-transparent mt-2`}>
                      {slide.subtitle}
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-gray-300 animate-fade-in-up delay-200 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300 pt-4">
                    <Link 
                      href={slide.ctaLink} 
                      className={`px-8 py-4 bg-gradient-to-r ${slide.accentGradient} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center gap-2 group`}
                    >
                      <span>{slide.cta}</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link 
                      href="/auth/register" 
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>

                {/* Right Column - Visual */}
                <div className="hidden lg:flex items-center justify-center animate-fade-in-up delay-200">
                  <div className="relative">
                    {/* Main Icon Circle */}
                    <div className={`relative w-80 h-80 rounded-full bg-gradient-to-br ${slide.accentGradient} p-1 animate-float`}>
                      <div className="w-full h-full rounded-full bg-[#0A0A0F] flex items-center justify-center">
                        <div className={`text-white opacity-80`}>
                          {slide.icon}
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl"></div>
                    </div>

                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl"></div>
                    </div>

                    <div className="absolute top-1/2 -right-16 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-float" style={{ animationDelay: '1.5s' }}>
                      <div className="w-full h-full bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            style={{
              animation: 'progress 5s linear',
              animationPlayState: isAutoPlaying ? 'running' : 'paused'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
