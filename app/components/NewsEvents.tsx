"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// ✅ Local images
import eventNews1 from "../../public/grid-products/8.png";
import eventNews2 from "../../public/grid-products/9.png";
import eventNews3 from "../../public/grid-products/10.png";

const slides = [eventNews1, eventNews2, eventNews3];

export default function NewsEventsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // ✅ Slower = More Premium
  const duration = 6000; // 6 seconds per slide

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    let frameId: number;

    const animate = () => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent < 100) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [currentIndex]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* ✅ PREMIUM IMAGE FADE + SOFT ZOOM */}
      {slides.map((img, i) => (
        <div
          key={i}
          className={`
            absolute inset-0
            transition-all duration-[2200ms] ease-in-out
            ${i === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          `}
        >
          {/* Layer 1: Blurred Background for Atmosphere */}
          <div className="absolute inset-0">
            <Image
              src={img}
              alt=""
              fill
              className="object-cover blur-xl opacity-50 scale-110"
            />
          </div>

          {/* Layer 2: Main Image - Fully Visible */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12">
            <Image
              src={img}
              alt={`News & Events Slide ${i + 1}`}
              fill
              priority={i === 0}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      ))}

      {/* ✅ SOFT DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/35 z-10" />

      {/* ✅ PREMIUM DOTTED PROGRESS - RESPONSIVE */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-5 items-center z-20">
        {slides.map((_, i) => (
          <div key={i} className="flex items-center gap-[4px] sm:gap-[6px]">
            {[...Array(6)].map((_, dotIndex) => {
              const dotThreshold = (dotIndex + 1) * (100 / 6);
              const isFilled =
                i < currentIndex ||
                (i === currentIndex && progress >= dotThreshold);

              return (
                <span
                  key={dotIndex}
                  className={`
                    block w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full
                    transition-all duration-500 ease-out
                    ${isFilled ? "bg-white scale-110" : "bg-white/25"}
                  `}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* ✅ MINIMAL CLEAN ARROWS - RESPONSIVE */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="
          absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20
          text-white/70 hover:text-white
          transition duration-300
        "
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20
          text-white/70 hover:text-white
          transition duration-300
        "
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </section>
  );
}
