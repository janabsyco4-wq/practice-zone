'use client';

import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backUrl?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, showBack = false, backUrl, action }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className="mb-8 animate-slide-in-up">
      {showBack && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
        >
          <svg 
            className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-gradient">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-400 text-lg">{subtitle}</p>
          )}
        </div>
        {action && (
          <div className="animate-slide-in-right">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
