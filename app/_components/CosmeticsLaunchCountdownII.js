'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const CosmeticsLaunchCountdownII = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');

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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle email submission logic here
      console.log('Email submitted:', email);
      alert('Thank you for subscribing! We\'ll notify you about exclusive offers.');
      setEmail('');
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-300 rounded w-64 mb-4"></div>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-slate-300 rounded-2xl w-24"></div>
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
        {/* Main time container with blue gradient background */}
        <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-600 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]">
          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          
          {/* Glass morphism effect */}
          <div className="absolute inset-0 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/25"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-2 font-serif">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider text-white/95 font-medium">
              {label}
            </div>
          </div>
          
          {/* Decorative corner elements */}
          <div className="absolute top-2 right-2 w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Image src="/bluem.png" alt="Cosmetics Logo" width={150} height={150} className="mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-4 font-serif leading-tight">
              Handmade with love
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 mb-2 font-light px-4">
              Pure organic skincare, launching soon.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 mb-8 sm:mb-12 px-4">
          <TimeUnit value={timeLeft.days} label="Days" index={0} />
          <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
          <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
          <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
        </div>

        {/* Launch Date Section */}
        <div className={`text-center mt-8 transform transition-all duration-1000 ease-out ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <p className="text-base sm:text-xl lg:text-2xl text-slate-700 mb-8 font-serif font-light px-4">
            On November 20th, 2025, Save the Date!
          </p>

          {/* Email Subscription Section */}
          <div className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '1000ms' }}>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100/50 max-w-2xl mx-auto mb-8">
              <p className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                Registered members enjoy lifetime exclusive offers!
              </p>
              <p className="text-sm sm:text-base text-slate-600 mb-6">
                Register now and get a flat 10% offer on your first order.
              </p>
              
              {/* Email Input Form */}
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 sm:py-4 text-slate-700 bg-white border-2 border-blue-200 rounded-full sm:rounded-r-none sm:rounded-l-full focus:border-blue-500 focus:outline-none transition-colors duration-300 text-sm sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full sm:rounded-l-none sm:rounded-r-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden whitespace-nowrap"
                >
                  <span className="relative z-10">Subscribe Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Footer Section */}
          <div className='pt-6'>
            <p className='text-slate-700 text-sm'>© 2025 U&I Naturals. All rights reserved.</p> 
            <p className='text-slate-700 text-sm'>
              Developed by <Link href="https://thepixelatedcafe.com" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 underline">The Pixelated Café</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Blue Theme */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-25 animate-pulse"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-2 sm:left-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br from-indigo-300 to-cyan-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/4 right-2 sm:right-8 w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      {/* Additional blue accent elements */}
      <div className="absolute bottom-1/3 left-1/4 w-4 sm:w-8 h-4 sm:h-8 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-5 sm:w-9 h-5 sm:h-9 bg-gradient-to-br from-indigo-200 to-blue-300 rounded-full opacity-12 animate-pulse" style={{ animationDelay: '5s' }}></div>
    </div>
  );
};

export default CosmeticsLaunchCountdownII;
