'use client';
import { useState, useEffect } from 'react';

const TimeUnit = ({ value, label, index, isLoaded }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsFlipping(true);
      const timeout = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [value, displayValue]);

  const maxValues = { days: 50, hours: 24, minutes: 60, seconds: 60 };
  const maxValue = maxValues[label.toLowerCase()] || 100;
  const progress = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 85;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`transform transition-all duration-1000 ease-out font-main ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="relative group">
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>

        {/* Multi-layer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400/30 via-pink-300/30 to-purple-400/30 blur-7xl group-hover:blur-2xl transition-all duration-500 scale-105 animate-pulse-slow"></div>
        {/* <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-300/20 via-pink-300/20 to-rose-300/20 blur-2xl opacity-60"></div> */}

        {/* Glass morphism container */}
        <div className="relative backdrop-blur-sm bg-white/5 rounded-full p-1 border border-white/10">
          {/* SVG Circle Progress */}
          <svg
            className="w-33 h-33 sm:w-33 sm:h-33 lg:w-40 lg:h-40 -rotate-90 relative z-10"
            viewBox="0 0 200 200"
          >
            {/* Inner glow circle */}
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="url(#innerGlow)"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Background circle with subtle gradient */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="url(#bgGradient)"
              strokeWidth="3"
              opacity="0.15"
            />

            {/* Defs for gradients and effects */}
            <defs>
              {/* Progress gradient */}
              <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899">
                  <animate attributeName="stop-color" values="#ec4899;#f97316;#ec4899" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#8b5cf6">
                  <animate attributeName="stop-color" values="#8b5cf6;#a855f7;#8b5cf6" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>

              {/* Background gradient */}
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fce7f3" />
                <stop offset="100%" stopColor="#f3e8ff" />
              </linearGradient>

              {/* Inner glow */}
              <radialGradient id="innerGlow">
                <stop offset="0%" stopColor="#fdf2f8" />
                <stop offset="100%" stopColor="#fae8ff" />
              </radialGradient>

              {/* Enhanced glow filter */}
              <filter id={`glow-${label}`} height="150%" width="150%" x="-25%" y="-25%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feFlood floodColor="#ec4899" floodOpacity="0.3" result="glowColor" />
                <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Sparkle filter */}
              <filter id={`sparkle-${label}`}>
                <feTurbulence baseFrequency="0.05" numOctaves="2" result="turbulence" />
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" />
              </filter>
            </defs>

            {/* Progress arc with double stroke */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke={`url(#gradient-${label})`}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              filter={`url(#glow-${label})`}
              className="transition-all duration-1000 ease-out"
              style={{ willChange: 'stroke-dashoffset' }}
            />

            {/* Inner progress line */}
            <circle
              cx="100"
              cy="100"
              r="82"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              opacity="0.4"
              className="transition-all duration-1000 ease-out"
            />

            {/* Animated glowing dot at progress end */}
            <g
              style={{
                transformOrigin: '100px 100px',
                transform: `rotate(${(progress / 100) * 360 + 90}deg)`,
              }}
            >
              <circle cx="100" cy="15" r="8" fill="#ec4899" opacity="0.3" className="animate-ping" />
              <circle cx="100" cy="15" r="6" fill="#ec4899" className="drop-shadow-lg">
                <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="15" r="3" fill="white" opacity="0.8" />
            </g>

            {/* Decorative sparkles */}
            <circle cx="100" cy="10" r="1.5" fill="white" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin="0s" />
            </circle>
            <circle cx="110" cy="12" r="1" fill="white" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="90" cy="12" r="1" fill="white" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" begin="1s" />
            </circle>
          </svg>

          {/* Center content with enhanced styling */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {/* Animated background blur */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 bg-gradient-to-br from-rose-400/10 via-pink-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
            </div>

            {/* Number display */}
            <div className="relative">
              <div
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 drop-shadow-sm ${
                  isFlipping ? 'scale-90 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'
                }`}
                style={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                //   textShadow: '0 2px 10px rgba(236, 72, 153, 0.3)',
                }}
              >
                {String(displayValue).padStart(2, '0')}
              </div>
              
              {/* Shimmer overlay on number */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm animate-shimmer-fast"></div>
            </div>

            {/* Label */}
            <div className="relative mt-3">
              <div
                className="text-xs sm:text-xs uppercase tracking-[0.3em] font-semibold bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 bg-clip-text text-transparent"
                style={{ letterSpacing: '0.25em' }}
              >
                {label}
              </div>
              {/* Subtle underline */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export function useCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const launchDate = new Date('2025-11-27T10:00:00').getTime();

  useEffect(() => {
    setIsMounted(true);
    const loadTimeout = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(loadTimeout);
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

    return () => clearInterval(timer);
  }, [launchDate, isMounted]);

  return { timeLeft, isLoaded, isMounted };
}

export { TimeUnit };
