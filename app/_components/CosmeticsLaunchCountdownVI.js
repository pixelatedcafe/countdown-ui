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

  // Handle hydration mismatch
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

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    const loadTimeout = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearInterval(timer);
      clearTimeout(loadTimeout);
    };
  }, [launchDate, isMounted]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          console.log('Email sent successfully');
          alert('Thank you for subscribing! Check your inbox for a welcome email.');
          setEmail('');
        } else {
          const data = await response.json();
          console.error('Error:', data.message);
          alert('Failed to subscribe. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-300 rounded w-64 mb-2"></div>
          <div className="grid grid-cols-2 gap-2">
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
        <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-600 rounded-2xl p-3 sm:p-4 md:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 min-w-[80px] sm:min-w-[100px] md:min-w-[110px] lg:min-w-[120px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          <div className="absolute inset-0 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/25"></div>
          <div className="relative z-10 text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 font-serif">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base uppercase tracking-wider text-white/95 font-medium">
              {label}
            </div>
          </div>
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full"></div>
          <div className="absolute bottom-1.5 left-1.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen sm:h-screen sm:overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-2 sm:p-3 relative">
      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center justify-between sm:h-full py-2 sm:py-3">
        {/* Header Section */}
        <div className="text-center mb-2 sm:mb-3">
          <div className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Image src="/bluem.png" alt="Cosmetics Logo" width={150} height={150} className="mx-auto mb-1 sm:mb-2" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-1 font-serif leading-tight">
              Handmade with love
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-700 font-light px-2">
              Pure organic skincare, launching soon.
            </p>
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 md:gap-4 mb-2 sm:mb-3 px-2">
          <TimeUnit value={timeLeft.days} label="Days" index={0} />
          <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
          <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
          <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
        </div>

        {/* Launch Date and Email Subscription Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className={`text-center transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '800ms' }}>
            <p className="text-sm sm:text-base md:text-lg text-slate-700 font-serif font-light px-2 mb-2 sm:mb-3">
              On November 20th, 2025, Save the Date!
            </p>

            <div className={`transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '1000ms' }}>
              <div className="rounded-2xl p-3 sm:p-4 max-w-xl mx-auto">
                <p className="text-sm sm:text-base md:text-lg text-slate-700 mb-2 sm:mb-3 font-serif font-light px-2">
                  Registered members enjoy lifetime exclusive offers!
                </p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-sm sm:max-w-md mx-auto">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-slate-700 bg-white border-2 border-blue-200 rounded-full sm:rounded-r-none sm:rounded-l-full focus:border-blue-500 focus:outline-none transition-colors duration-300 text-xs sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full sm:rounded-l-none sm:rounded-r-full font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden whitespace-nowrap"
                  >
                    <span className="relative z-10">Subscribe Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-2 sm:mt-3">
          <p className="text-xs sm:text-sm text-slate-700">© 2025 U&I Naturals. All rights reserved.</p>
          <p className="text-xs sm:text-sm text-slate-700">
            Developed by <Link href="https://thepixelatedcafe.com" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 underline">The Pixelated Café</Link>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-6 sm:top-8 left-3 sm:left-6 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-25 animate-pulse"></div>
      <div className="absolute bottom-6 sm:bottom-8 right-3 sm:right-6 w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-2 sm:left-3 w-5 sm:w-8 h-5 sm:h-8 bg-gradient-to-br from-indigo-300 to-cyan-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/4 right-2 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '3s' }}></div>
    </div>
  );
};

export default CosmeticsLaunchCountdownII;