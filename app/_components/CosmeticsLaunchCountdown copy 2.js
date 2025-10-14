'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const CosmeticsLaunchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');

  const launchDate = new Date('2025-11-20T10:00:00').getTime();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    setTimeout(() => setIsLoaded(true), 50);

    return () => clearInterval(timer);
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
          alert('✓ SUBSCRIBED! Check your inbox for a welcome email.');
          setEmail('');
        } else {
          const data = await response.json();
          console.error('Error:', data.message);
          alert('✗ FAILED. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        alert('✗ ERROR. Please try again later.');
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-4xl font-black">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Bold geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-rose-500 opacity-10 transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-purple-600 opacity-10 transform -rotate-6"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-pink-500 opacity-5 transform rotate-45"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header section */}
        <div className="px-6 sm:px-12 py-8 border-b-4 border-black">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border-4 border-black bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center">
                <Image 
                  src="/rose.png" 
                  alt="U&I Naturals" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  U&I Naturals
                </h2>
                <p className="text-xs uppercase tracking-wider font-bold">Handmade · Organic</p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-sm font-black uppercase tracking-wider">Nov 20, 2025</div>
            </div>
          </div>
        </div>

        {/* Main countdown area */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-7xl w-full">
            
            {/* Large heading */}
            <div className={`mb-12 sm:mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="relative">
                <h1 
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="block">LAUNCHING</span>
                  <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    SOON
                  </span>
                </h1>
                <div className="w-32 sm:w-48 h-2 bg-black"></div>
              </div>
            </div>

            {/* Countdown grid */}
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              
              {/* Days */}
              <div className="relative group">
                <div className="border-4 border-black bg-white hover:bg-rose-50 transition-colors duration-300 p-6 sm:p-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div>
                  <div className="text-6xl sm:text-7xl md:text-8xl font-black leading-none mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest">DAYS</div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-rose-500 transform translate-x-1 translate-y-1"></div>
                </div>
              </div>

              {/* Hours */}
              <div className="relative group">
                <div className="border-4 border-black bg-white hover:bg-pink-50 transition-colors duration-300 p-6 sm:p-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                  <div className="text-6xl sm:text-7xl md:text-8xl font-black leading-none mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest">HOURS</div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 transform translate-x-1 translate-y-1"></div>
                </div>
              </div>

              {/* Minutes */}
              <div className="relative group">
                <div className="border-4 border-black bg-white hover:bg-purple-50 transition-colors duration-300 p-6 sm:p-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-rose-500"></div>
                  <div className="text-6xl sm:text-7xl md:text-8xl font-black leading-none mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest">MINUTES</div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 transform translate-x-1 translate-y-1"></div>
                </div>
              </div>

              {/* Seconds */}
              <div className="relative group">
                <div className="border-4 border-black bg-white hover:bg-rose-50 transition-colors duration-300 p-6 sm:p-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div>
                  <div className="text-6xl sm:text-7xl md:text-8xl font-black leading-none mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-widest">SECONDS</div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-rose-400 transform translate-x-1 translate-y-1"></div>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className={`mb-8 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="border-4 border-black bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 p-6 sm:p-8 text-center">
                <p className="text-white text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Pure Organic Skincare · Handmade with Love
                </p>
              </div>
            </div>

            {/* Email subscription section */}
            <div className={`mb-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="border-4 border-black bg-white p-6 sm:p-8 max-w-3xl mx-auto">
                <div className="text-center mb-6">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    GET EXCLUSIVE ACCESS
                  </h3>
                  <div className="w-24 h-1 bg-black mx-auto mb-4"></div>
                  <p className="text-sm sm:text-base font-bold uppercase tracking-wide">
                    Registered members enjoy lifetime exclusive offers!
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL ADDRESS"
                      required
                      className="w-full px-6 py-4 text-black bg-white border-4 border-black focus:border-rose-500 focus:outline-none transition-colors duration-300 font-bold uppercase placeholder:text-gray-400 placeholder:font-bold text-sm sm:text-base"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative bg-black text-white px-8 py-4 font-black uppercase text-sm sm:text-base tracking-wider hover:bg-gradient-to-r hover:from-rose-500 hover:via-pink-500 hover:to-purple-600 transition-all duration-300 border-4 border-black overflow-hidden group"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="relative z-10">SUBSCRIBE NOW</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </form>
              </div>
            </div>

            {/* Event date block */}
            <div className={`flex justify-center transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="inline-block border-4 border-black bg-white px-8 py-4">
                <div className="text-center">
                  <div className="text-xs font-black uppercase tracking-widest mb-1">Save the Date</div>
                  <div className="text-3xl sm:text-4xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    NOVEMBER 20, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-12 py-6 border-t-4 border-black bg-gray-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase font-bold tracking-wider">
            <div>© 2025 U&I Naturals. All Rights Reserved.</div>
            <div>
              Developed by{' '}
              <Link 
                href="https://thepixelatedcafe.com"
                className="underline hover:text-pink-600 transition-colors"
              >
                The Pixelated Café
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Font import */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default CosmeticsLaunchCountdown;
