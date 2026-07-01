"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import slider1 from "../../public/products/product-1.png";
import slider2 from "../../public/products/product-2.png";
import slider3 from "../../public/products/product-3.png";
import slider4 from "../../public/products/product-4.png";

const slides = [
  {
    image: slider1,
    title: "RIZONN XBAR Solutions",
    desc: "All-in-one soundbar with 4K camera, perfect for huddle rooms and small meeting spaces.",
  },
  {
    image: slider2,
    title: "MTR on Windows Platform",
    desc: "Intelligent interactive displays with real-time analytics and Microsoft Teams integration.",
  },
  {
    image: slider3,
    title: "Large Interactive Panels",
    desc: "Enterprise-grade collaborative touchscreens for immersive team collaboration.",
  },
  {
    image: slider4,
    title: "Modern Conference Rooms",
    desc: "Complete meeting room solutions with professional displays and conferencing systems.",
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // ✅ Slower timeline → 6 seconds
  const duration = 6000;

  useEffect(() => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setProgress(0);
    setShowContent(false);

    // ✅ Content delay (so it feels premium)
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = (elapsed / duration) * 100;

      if (percent >= 100) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        return;
      }

      setProgress(percent);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(contentTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentIndex]);

  const handlePrevious = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="w-full h-screen relative overflow-hidden bg-black">

      {/* ✅ SLOW IMAGE FADE TRANSITION */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out
            ${i === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image src={slide.image} alt="" fill className="object-cover" />
        </div>
      ))}

      {/* ✅ DARK GRADIENT OVERLAY FOR TEXT VISIBILITY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />

      {/* ✅ SLOW & ELEGANT CONTENT ANIMATION - RESPONSIVE */}
      <div className="absolute z-20 left-[4%] sm:left-[6%] md:left-[8%] top-1/2 -translate-y-1/2 max-w-[90%] sm:max-w-lg md:max-w-xl text-white px-4 sm:px-0">
        <h1
          className={`
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 leading-tight drop-shadow-2xl
            transition-all duration-[1200ms] ease-out
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {slides[currentIndex].title}
        </h1>

        <p
          className={`
            text-base sm:text-lg md:text-xl text-white/95 mb-6 sm:mb-8 md:mb-10 drop-shadow-lg leading-relaxed
            transition-all duration-[1200ms] ease-out delay-200
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {slides[currentIndex].desc}
        </p>

        {/* <button
          className={`
            px-6 py-3 sm:px-8 cursor-pointer sm:py-4 bg-white text-black rounded-full font-medium flex items-center gap-2
            shadow-xl hover:bg-gray-100 hover:shadow-2xl transition-all duration-300
            text-sm sm:text-base
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          Learn More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button> */}
      </div>

      {/* ✅ SLOW & CLEAN TIMELINE - RESPONSIVE */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] max-w-xl gap-2 sm:gap-3 z-20 px-4 sm:px-0">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 h-[2px] sm:h-[3px] rounded-full bg-white/30 overflow-hidden">
            <div
              className="h-full bg-white"
              style={{
                width: i === currentIndex ? `${progress}%` : "0%",
                transition: i === currentIndex ? "none" : "width 0.4s ease",
              }}
            />
          </div>
        ))}
      </div>

      {/* ✅ CLEAN & SLOW ARROWS WITH FIXED ANIMATION - RESPONSIVE */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 
        bg-black/30 border border-white/20 backdrop-blur-md rounded-full 
        text-white hover:bg-black/50 transition duration-300 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 
        bg-black/30 border border-white/20 backdrop-blur-md rounded-full 
        text-white hover:bg-black/50 transition duration-300 z-20"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </section>
  );
}
