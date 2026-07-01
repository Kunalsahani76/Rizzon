"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 150);
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-28 bg-[#0A0A0A] text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#020303]" />
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.14) 1.4px, transparent 1.8px)",
            backgroundSize: "16px 16px",
            maskImage:
              "radial-gradient(ellipse 15% 34% at 30% 38%, #000 0 58%, transparent 64%), radial-gradient(ellipse 18% 44% at 39% 57%, #000 0 54%, transparent 62%), radial-gradient(ellipse 17% 30% at 54% 35%, #000 0 58%, transparent 65%), radial-gradient(ellipse 21% 45% at 64% 55%, #000 0 56%, transparent 64%), radial-gradient(ellipse 13% 30% at 79% 51%, #000 0 54%, transparent 62%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 15% 34% at 30% 38%, #000 0 58%, transparent 64%), radial-gradient(ellipse 18% 44% at 39% 57%, #000 0 54%, transparent 62%), radial-gradient(ellipse 17% 30% at 54% 35%, #000 0 58%, transparent 65%), radial-gradient(ellipse 21% 45% at 64% 55%, #000 0 56%, transparent 64%), radial-gradient(ellipse 13% 30% at 79% 51%, #000 0 54%, transparent 62%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,30,45,0.22),transparent_42%),linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.28)_46%,rgba(0,0,0,0.92))]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">

        {/* Heading */}
        <h3
          className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide mb-4 sm:mb-6
          transition-all duration-[1400ms] ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          ABOUT RIZONN
        </h3>

        {/* Paragraph 1 */}
        <p
          className={`mt-4 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-gray-300 max-w-3xl mx-auto
          transition-all duration-[1600ms] delay-150
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          At Rizonn, we build the backbone of smart, connected infrastructure. We combine in-house product manufacturing with end-to-end system integration to deliver powerful networking and digital solutions for airports, railway stations, corporate campuses, hospitality, and enterprise environments.
        </p>

        {/* Paragraph 2 */}
        <p
          className={`mt-4 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-gray-300 max-w-3xl mx-auto
          transition-all duration-[1600ms] delay-300
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Our core strength lies in delivering high-performance network hardware—including Switches, Access Points, WLAN Controllers, and FIDS systems—along with full-stack implementation of Wi-Fi networks, surveillance, automation, and digital infrastructure platforms.
        </p>



        {/* Stats Section */}
        {/* <div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 text-center
          transition-all duration-[1800ms] delay-500
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {[
            { value: "6500+", label: "Total Employees" },
            { value: "30", label: "Average Age" },
            { value: "60+", label: "R&D Engineer" },
            { value: "US 3B", label: "Revenue" },
          ].map((item, index) => (
            <div
              key={index}
              className="transition-all duration-700 hover:-translate-y-1"
            >
              <p className="text-4xl font-semibold tracking-wide">
                {item.value}
              </p>
              <p className="text-gray-400 mt-2 text-sm tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div> */}

      </div>
    </section>
  );
}
