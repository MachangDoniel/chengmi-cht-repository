import React, { useState, useEffect } from 'react';

interface ReadingProgressBarProps {
  activeTab?: 'overview' | 'timeline' | 'map' | 'archives' | 'blog';
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ activeTab }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (height > 50) {
        const scrolled = (winScroll / height) * 100;
        const bounded = Math.min(100, Math.max(0, scrolled));
        setScrollProgress(bounded);
        setIsVisible(winScroll > 30);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeTab]);

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'timeline':
        return 'Chronological Timeline';
      case 'blog':
        return 'Historical Article';
      case 'archives':
        return 'Archival Transcripts';
      case 'map':
        return 'Regional Cartography';
      default:
        return 'Historical Monograph';
    }
  };

  return (
    <div
      className={`sticky top-16 z-30 w-full transition-opacity duration-300 pointer-events-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Background Track */}
      <div className="w-full h-[2.5px] bg-stone-200/50 dark:bg-stone-800/60 backdrop-blur-xs relative overflow-visible">
        {/* Animated Filling Progress Bar */}
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 dark:from-amber-400 dark:via-emerald-400 dark:to-teal-300 shadow-[0_0_8px_rgba(217,119,6,0.6)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Small subtle floating badge on reading progress */}
        {scrollProgress > 5 && (
          <div
            className="absolute top-1.5 right-4 z-40 px-2 py-0.5 rounded-full bg-stone-900/85 dark:bg-stone-800/90 text-stone-200 text-[10px] font-mono tracking-tight shadow-md border border-stone-700/60 backdrop-blur-md pointer-events-auto transition-opacity"
            title={`${Math.round(scrollProgress)}% read of ${getSectionTitle()}`}
          >
            <span className="text-amber-400 font-bold">{Math.round(scrollProgress)}%</span>
            <span className="text-stone-400 hidden sm:inline ml-1.5">read</span>
          </div>
        )}
      </div>
    </div>
  );
};
