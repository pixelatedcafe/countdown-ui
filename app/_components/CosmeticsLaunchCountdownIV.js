'use client'

import React, { useState, useEffect } from 'react';

const CosmeticsLaunchCountdownIV = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Launch date: November 20th, 2025 at 10:00 AM
  const launchDate = new Date('2025-11-20T10:00:00').getTime();

  // Handle hydration mismatch by only showing content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate initial time immediately
    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    // Animation delay for smooth loading
    const loadTimeout = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearInterval(timer);
      clearTimeout(loadTimeout);
    };
  }, [launchDate, isMounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-amber-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-stone-300 rounded w-64 mb-4"></div>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-stone-300 rounded-2xl w-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const TimeUnit = ({ value, label, index }) => (
    <div 
      className={`transform transition-all duration-700 ease-out ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative group">
        {/* Main time container with sophisticated neutral gradient */}
        <div className="relative bg-gradient-to-br from-stone-700 via-slate-800 to-zinc-900 rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 min-w-[80px] sm:min-w-[100px] lg:min-w-[120px] border border-stone-600/20">
          {/* Subtle golden shimmer effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/10 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          
          {/* Premium glass morphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-amber-200/10"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-amber-50 mb-1 sm:mb-2 font-serif tracking-tight">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-widest text-stone-300 font-medium">
              {label}
            </div>
          </div>
          
          {/* Sophisticated corner accents */}
          <div className="absolute top-2 right-2 w-2 h-2 sm:w-3 sm:h-3 bg-amber-300/30 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-stone-400/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-100 to-amber-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(120,113,108,0.1),transparent_50%)]"></div>
      
      <div className="max-w-6xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-stone-800 via-slate-700 to-amber-800 bg-clip-text text-transparent mb-4 font-serif leading-tight">
              Timeless Beauty
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-stone-700 mb-2 font-light px-4 tracking-wide">
              Our exclusive collection arrives in
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-600 to-stone-600 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 mb-8 sm:mb-12 px-4">
          <TimeUnit value={timeLeft.days} label="Days" index={0} />
          <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
          <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
          <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
        </div>

        {/* Launch Details */}
       
        {/* Premium Social Proof Section */}
        <div className={`text-center mt-8 transform transition-all duration-1000 ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <p className="text-sm text-stone-600 mb-2 tracking-wide">Trusted by discerning beauty enthusiasts</p>
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-xs text-stone-500 mt-1 tracking-wider">Exclusively reviewed by beauty professionals</p>
        </div>
      </div>

      {/* Sophisticated Decorative Elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-br from-stone-300/20 to-amber-300/20 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-br from-slate-300/20 to-stone-300/20 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-2 sm:left-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br from-amber-200/20 to-stone-400/20 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/4 right-2 sm:right-8 w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-stone-200/20 to-slate-300/20 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      {/* Additional sophisticated accent elements */}
      <div className="absolute bottom-1/3 left-1/4 w-4 sm:w-8 h-4 sm:h-8 bg-gradient-to-br from-amber-100/20 to-stone-300/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-5 sm:w-9 h-5 sm:h-9 bg-gradient-to-br from-slate-200/20 to-stone-300/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '5s' }}></div>
      
      {/* Minimalist geometric accents */}
      <div className="absolute top-1/5 left-1/3 w-3 sm:w-6 h-3 sm:h-6 bg-gradient-to-br from-stone-100/20 to-amber-200/20 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '6s' }}></div>
      <div className="absolute bottom-1/5 right-1/4 w-2 sm:w-4 h-2 sm:h-4 bg-gradient-to-br from-slate-100/20 to-stone-200/20 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '7s' }}></div>
    </div>
  );
};

export default CosmeticsLaunchCountdownIV;
