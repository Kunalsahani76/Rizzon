"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import slider1 from "../../public/banner-images/banner-1.png";
import slider2 from "../../public/banner-images/banner-2.png";
import slider4 from "../../public/banner-images/banner-3.png";
import slider5 from "../../public/banner-images/banner-4.png";

const slides = [slider1, slider2, slider4, slider5];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // NEW: controls whether text/button are shown (animated)
  const [showText, setShowText] = useState(true);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto slide with progress bar
  useEffect(() => {
    setProgress(0);
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          next();
          return 0;
        }
        return prev + 1;
      });
    }, 60); // 60ms * 100 = 6000ms (6 seconds) for full progress

    return () => clearInterval(progressTimer);
  }, [index]);

  // NEW: delay content reveal on slide change (keeps things smooth)
  useEffect(() => {
    setShowText(false);
    const t = setTimeout(() => setShowText(true), 400); // 400ms delay before showing text
    return () => clearTimeout(t);
  }, [index]);

  return (
    <section className="w-full h-[100dvh] relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_#2a2a2a_0%,_#000000_100%)]">
      {/* SLIDE TRACK */}
      <div
        className="absolute inset-0 flex transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,0.1,0.08,1)]"
        style={{ transform: `translate3d(-${index * 100}%,0,0)`, willChange: 'transform' }}
      >
        {slides.map((img, i) => (
          <div key={i} className="relative w-full h-[100dvh] flex-shrink-0 overflow-hidden">

            {/* BACKGROUND FADE LAYER */}
            <div className="absolute inset-0 opacity-60">
              <Image
                src={img}
                alt={`slide-${i}`}
                fill
                className="object-cover blur-[2px] saturate-[1.2]"
              />
            </div>

            {/* PARALLAX FOREGROUND IMAGE */}
            <div
              className="absolute inset-0 transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,0.1,0.08,1)]"
              style={{ transform: index === i ? 'scale(1)' : 'scale(1.05)', willChange: 'transform' }}
            >
              <Image
                src={img}
                alt={`slide-${i}`}
                fill
                className="object-cover"
              />

              {/* Dark Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

              {/* Text content for slider1 (index 0) - Innovation & Future */}
              {i === 0 && (
                <div className={`absolute inset-0 flex flex-col items-start justify-center text-white text-left pl-6 sm:pl-12 md:pl-20 lg:pl-0  z-10
                  transition-all duration-700 ease-out max-w-screen-xl mx-auto w-full
                  ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

                  <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-[80px] font-bold mb-4 sm:mb-6 tracking-wide uppercase leading-[1.1] drop-shadow-2xl">
                    INTELLIGENT NETWORKS.<br />
                    SMART INFRASTRUCTURE.<br />
                    MADE IN INDIA.
                  </h2>
                  <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-normal mb-6 sm:mb-10 text-white/95 tracking-wide drop-shadow-lg max-w-lg sm:max-w-2xl md:max-w-4xl">
                    Powering the Future of Smart, Connected Infrastructure.
                  </h3>
                  <Link href="/solutions" className={`flex cursor-pointer items-center gap-2 bg-[#0066FF] hover:bg-blue-600 text-white font-medium py-2.5 px-6 sm:py-3 sm:px-8 rounded-full transition duration-300 text-sm sm:text-[15px] shadow-xl hover:shadow-2xl
                    transform transition-transform duration-400 ${showText ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                    <span>Explore Solutions</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}

              {/* Text content for slider4 (index 3) - Strategic Partnerships */}
              {i === 3 && (
                <div className={`absolute inset-0 flex flex-col items-start justify-center text-white text-left pl-6 sm:pl-12 md:pl-20 lg:pl-0 pr-4 sm:pr-12 md:pr-20 z-10
                  transition-all duration-700 ease-out max-w-screen-xl mx-auto w-full
                  ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-wide uppercase drop-shadow-2xl leading-tight">END-TO-END MANUFACTURING</h2>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-white/95 drop-shadow-lg max-w-lg sm:max-w-2xl md:max-w-4xl">From Switches & Wi-Fi APs to FIDS & IoT Automation.<br />We Build It All.</h3>
                  <Link href="/products" className={`flex cursor-pointer items-center gap-2 bg-[#0066FF] hover:bg-blue-600 text-white font-medium py-2.5 px-6 sm:py-3 sm:px-8 rounded-full transition duration-300 text-sm sm:text-[15px] shadow-xl hover:shadow-2xl
                    transform transition-transform duration-400 ${showText ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                    <span>View Products</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}

              {/* Text content for slider2 (index 1) - Unified Collaboration */}
              {i === 1 && (
                <div className={`absolute inset-0 flex flex-col items-start justify-center text-white text-left pl-6 sm:pl-12 md:pl-20 lg:pl-0 pr-4 sm:pr-12 md:pr-20 z-10
                  transition-all duration-700 ease-out max-w-screen-xl mx-auto w-full
                  ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-wide uppercase drop-shadow-2xl leading-tight">SEAMLESS CONNECTIVITY</h2>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 text-white/95 drop-shadow-lg max-w-lg sm:max-w-2xl md:max-w-4xl">High-Performance Wi-Fi 6/6E & Wired Networks</h3>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-white/95 drop-shadow-lg max-w-lg sm:max-w-2xl md:max-w-4xl">For Airports, Campuses & Enterprises.</h3>
                  <Link href="/solutions" className={`flex cursor-pointer items-center gap-2 bg-[#0066FF] hover:bg-blue-600 text-white font-medium py-2.5 px-6 sm:py-3 sm:px-8 rounded-full transition duration-300 text-sm sm:text-[15px] shadow-xl hover:shadow-2xl
                    transform transition-transform duration-400 ${showText ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                    <span>Discover More</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
              {/* Text content for slider3 (index 2) - Digital Transformation */}
              {i === 2 && (
                <div className={`absolute inset-0 flex flex-col items-start justify-center text-white text-left pl-6 sm:pl-12 md:pl-20 lg:pl-0 pr-4 sm:pr-12 md:pr-20 z-10
                  transition-all duration-700 ease-out max-w-screen-xl mx-auto w-full
                  ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-wide uppercase drop-shadow-2xl leading-tight">FUTURE-READY INFRASTRUCTURE</h2>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-white/95 drop-shadow-lg max-w-lg sm:max-w-2xl md:max-w-4xl">Secure, Scalable & Intelligent Solutions<br />Designed for Zero-Disruption Operations.</h3>
                  <Link href="/contact" className={`flex cursor-pointer items-center gap-2 bg-[#0066FF] hover:bg-blue-600 text-white font-medium py-2.5 px-6 sm:py-3 sm:px-8 rounded-full transition duration-300 text-sm sm:text-[15px] shadow-xl hover:shadow-2xl
                    transform transition-transform duration-400 ${showText ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                    <span>Start Your Journey</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION DOTS */}
      <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 flex justify-center z-20">
        <div className="flex items-center gap-4">
          {slides.map((_, i) => (
            <div key={i} className="relative flex items-center justify-center w-8 h-8 cursor-pointer" onClick={() => setIndex(i)}>
              {/* Dot */}
              <div
                className={`rounded-full transition-colors duration-300 ${i === index
                  ? 'w-2.5 h-2.5 bg-[#0066FF]'
                  : 'w-2.5 h-2.5 bg-white hover:bg-gray-200'
                  }`}
              />

              {/* Progress Ring for Active Slide */}
              {i === index && (
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="10"
                    fill="none"
                    stroke="#0066FF"
                    strokeWidth="1.5"
                    strokeDasharray={`${2 * Math.PI * 10}`}
                    strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-100 ease-linear"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full
                   bg-[#333333]/80 hover:bg-[#222222] text-white transition-all duration-300 z-20 shadow-xl group backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white/90 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full
                   bg-[#333333]/80 hover:bg-[#222222] text-white transition-all duration-300 z-20 shadow-xl group backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white/90 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
