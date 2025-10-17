'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TimeUnit, useCountdownTimer } from './CountdownTimer';
import Swal from 'sweetalert2';

const CosmeticsLaunchCountdown = () => {
  const { timeLeft, isLoaded, isMounted } = useCountdownTimer();
  const [email, setEmail] = useState('');

  const handleEmailSubmit = async (e) => {
  e.preventDefault();
  if (email) {
    try {
      // Show loading alert
      Swal.fire({
        title: 'Processing...',
        html: 'Please wait while we register you',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          popup: 'font-main',
          confirmButton: 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600'
        }
      });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if user is already registered
        if (data.message === 'You already registered!') {
          // Already Registered Alert
          Swal.fire({
            title: 'Already An U&I Family Member!',
            html: `
              <div style="text-align: center;">
                <p style="font-size: 16px; color: #64748b; margin-bottom: 12px;">
                  You're already registered with us!
                </p>
                <p style="font-size: 14px; color: #64748b;">
                  The email <strong style="color: #8b5cf6;">${email}</strong> is already in our exclusive members list.
                </p>
                <p style="font-size: 14px; color: #ec4899; margin-top: 16px;">
                  🎁 Get ready for amazing offers on launch day!
                </p>
              </div>
            `,
            icon: 'info',
            iconColor: '#8b5cf6',
            confirmButtonText: 'Got It!',
            confirmButtonColor: '#8b5cf6',
            background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 100%)',
             backdrop: `
              rgba(236, 72, 153, 0.1)
              left top
              no-repeat
            `,
            showClass: {
              popup: 'animate__animated animate__bounceIn animate__faster'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp animate__faster'
            },
            customClass: {
              popup: 'font-main rounded-3xl',
              title: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600',
              confirmButton: 'bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
            }
          });
        } else {
          // New Registration Success Alert
          console.log('Email sent successfully');
          
          Swal.fire({
            title: 'Welcome to U&I Naturals! 🌸',
            html: `
              <div style="text-align: center;">
                <p style="font-size: 16px; color: #64748b; margin-bottom: 12px;">
                  Thank you for joining us!
                </p>
                <p style="font-size: 14px; color: #64748b;">
                  Check your inbox at <strong style="color: #ec4899;">${email}</strong> for a welcome email.
                </p>
                <p style="font-size: 14px; color: #8b5cf6; margin-top: 16px;">
                  🎁 Enjoy lifetime exclusive offers as a registered member!
                </p>
              </div>
            `,
            icon: 'success',
            iconColor: '#ec4899',
            confirmButtonText: 'Awesome!',
            confirmButtonColor: '#ec4899',
            background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 100%)',
            backdrop: `
              rgba(236, 72, 153, 0.1)
              left top
              no-repeat
            `,
            showClass: {
              popup: 'animate__animated animate__fadeInDown animate__faster'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp animate__faster'
            },
            customClass: {
              popup: 'font-main rounded-3xl',
              title: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600',
              confirmButton: 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
            }
          });
        }
        
        setEmail('');
      } else {
        console.error('Error:', data.message);
        
        // Error Alert
        Swal.fire({
          title: 'Oops!',
          html: `
            <p style="font-size: 16px; color: #64748b;">
              Failed to subscribe. Please try again later.
            </p>
          `,
          icon: 'error',
          iconColor: '#ef4444',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#ef4444',
          background: '#fff',
          customClass: {
            popup: 'font-main rounded-3xl',
            confirmButton: 'px-6 py-3 rounded-2xl font-semibold shadow-lg'
          }
        });
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      
      // Network Error Alert
      Swal.fire({
        title: 'Connection Error',
        html: `
          <p style="font-size: 16px; color: #64748b;">
            An error occurred. Please check your internet connection and try again.
          </p>
        `,
        icon: 'warning',
        iconColor: '#f59e0b',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#f59e0b',
        background: '#fff',
        customClass: {
          popup: 'font-main rounded-3xl',
          confirmButton: 'px-6 py-3 rounded-2xl font-semibold shadow-lg'
        }
      });
    }
  }
};


  // Handle hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-300 rounded-2xl w-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Image src="/rose.png" alt="Cosmetics Logo" width={200} height={200} className="mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent  font-main">
              Handmade With Love
            </h1>
            <p className="text-base sm:text-md lg:text-lg text-gray-600 mb-2 font-light px-4 font-main">
              Pure Organic Skincare, Launching Soon.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 px-4">
          <TimeUnit value={timeLeft.days} label="Days" index={0} isLoaded={isLoaded} />
          <TimeUnit value={timeLeft.hours} label="Hours" index={1} isLoaded={isLoaded} />
          <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} isLoaded={isLoaded} />
          <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} isLoaded={isLoaded} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center mt-6">
          <div className={`text-center transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '800ms' }}>
            <p className="text-base sm:text-lg md:text-xl text-slate-700 font-main font-light px-2 mb-2 sm:mb-3">
              On November 27th, 2025. Save the Date!
            </p>

            <div className={`transform transition-all duration-1000 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '1000ms' }}>
                <div className="max-w-xl mx-auto px-4">
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 mb-4 sm:mb-5 font-main font-light px-2">
                    Registered members enjoy lifetime exclusive offers!
                  </p>
                  
                  {/* Modern Email Box with Glassmorphism Effect */}
                  <div className="relative group">
                    {/* Main Form Container */}
                    <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/50">
                      <form onSubmit={handleEmailSubmit}>
                        {/* Email Input and Button in Same Line */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value.toLowerCase())}
                              placeholder="Enter your email"
                              required
                              className="w-full pl-12 pr-4 py-3.5 text-slate-700 bg-white/80 border-2 border-transparent rounded-2xl focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-sm sm:text-base placeholder:text-slate-400 font-main"
                            />
                          </div>
                          
                          {/* Submit Button with Shimmer Effect */}
                          <button
                            type="submit"
                            className="relative group/btn bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white px-8 py-3.5 rounded-2xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden whitespace-nowrap"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              Join Us!
                              <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-700">© 2025 U&I Naturals. All rights reserved. | Developed by <Link href="https://thepixelatedcafe.com" className=" hover:text-blue-800 transition-colors font-semibold duration-300">Pixelated</Link></p>
          
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-2 sm:left-5 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br from-purple-300 to-rose-400 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/4 right-2 sm:right-8 w-6 sm:w-10 h-6 sm:h-10 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '3s' }}></div>
    </div>
  );
};

export default CosmeticsLaunchCountdown;
