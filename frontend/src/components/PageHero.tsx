'use client';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  gradient?: 'purple' | 'blue' | 'pink' | 'orange';
  size?: 'small' | 'medium' | 'large';
}

export default function PageHero({ 
  title, 
  subtitle, 
  gradient = 'purple',
  size = 'medium' 
}: PageHeroProps) {
  const heights = {
    small: 'h-64',
    medium: 'h-80',
    large: 'h-96'
  };

  const gradients = {
    purple: {
      from: 'from-purple-600/30',
      to: 'to-pink-600/20',
      accent: 'from-purple-500 to-pink-500'
    },
    blue: {
      from: 'from-blue-600/30',
      to: 'to-purple-600/20',
      accent: 'from-blue-500 to-purple-500'
    },
    pink: {
      from: 'from-pink-600/30',
      to: 'to-orange-600/20',
      accent: 'from-pink-500 to-orange-500'
    },
    orange: {
      from: 'from-orange-600/30',
      to: 'to-pink-600/20',
      accent: 'from-orange-500 to-pink-500'
    }
  };

  const currentGradient = gradients[gradient];

  return (
    <div className={`relative ${heights[size]} overflow-hidden mt-20`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className={`absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br ${currentGradient.from} ${currentGradient.to} rounded-full blur-3xl opacity-50 animate-float`}></div>
        <div className={`absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-gradient-to-tr ${currentGradient.from} ${currentGradient.to} rounded-full blur-3xl opacity-40 animate-float`} style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-sm font-semibold text-white">Explore</span>
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up delay-100`}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-300 animate-fade-in-up delay-200 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent"></div>
    </div>
  );
}
