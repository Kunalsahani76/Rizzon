"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Images
import enterpriseImg from "@/public/enterprice.jpeg";
import educationImg from "@/public/Education solutions.jpeg";
import industrialImg from "@/public/s1.jpeg";
import poeImg from "@/public/s2.jpeg";

type Section = "Industry" | "Platform";
type IndustryTab = "Access Point" | "Network Switches";
type PlatformTab = "Industrial Managed Switch" | "PoE Fiber Switch";

const INDUSTRY_DATA: Record<IndustryTab, any> = {
  "Access Point": {
    title: "Wireless Access Points",
    description:
      "Next-generation Wi-Fi 6/6E access points delivering high-speed, secure, and seamless connectivity for high-density environments.",
    image: enterpriseImg,
  },
  "Network Switches": {
    title: "Industrial Network Switches",
    description:
      "Robust, high-performance managed and unmanaged switches designed for reliable data transmission in demanding industrial applications.",
    image: educationImg,
  },
};

const PLATFORM_DATA: Record<PlatformTab, any> = {
  "Industrial Managed Switch": {
    title: "Industrial Managed Switches",
    description:
      "Advanced L2/L3 managed switches with ring redundancy and enhanced security for critical industrial networks.",
    image: industrialImg,
  },
  "PoE Fiber Switch": {
    title: "PoE Fiber Switches",
    description:
      "Long-range power and data transmission with high-power PoE++ support for surveillance and IoT deployments.",
    image: poeImg,
  },
};

export default function EnterprisePlatformSection() {
  const [activeSection, setActiveSection] = useState<Section>("Industry");
  const [industryTab, setIndustryTab] = useState<IndustryTab>("Access Point");
  const [platformTab, setPlatformTab] =
    useState<PlatformTab>("Industrial Managed Switch");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const activeContent =
    activeSection === "Industry"
      ? INDUSTRY_DATA[industryTab]
      : PLATFORM_DATA[platformTab];

  return (
    <section className="relative w-full min-h-screen md:h-[92vh] overflow-hidden bg-[#f5f7fb]">

      {/* ✅ PREMIUM BACKGROUND IMAGE - RESPONSIVE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeContent.title}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute right-0 top-0 h-full w-full md:w-[70%]"
        >
          <Image
            src={activeContent.image}
            alt={activeContent.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f7fb] via-[#f5f7fb]/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ✅ DIAGONAL SEPARATION - HIDE ON MOBILE */}
      <div className="hidden md:block absolute left-0 top-0 z-10 h-full w-[360px] bg-white diagonal-separator shadow-[20px_0_60px_rgba(0,0,0,0.08)]" />

      {/* ✅ MAIN WRAPPER - RESPONSIVE */}
      <div className="relative z-20 flex flex-col md:flex-row h-full">

        {/* ✅ LEFT SIDEBAR - RESPONSIVE */}
        <aside className="w-full md:w-[300px] bg-white/95 md:bg-white/85 backdrop-blur-xl flex flex-col justify-between py-8 md:py-14 px-6 md:px-10">
          <div className="flex flex-col gap-6 md:gap-10">
            {["Industry", "Platform"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item as Section)}
                className={`group relative text-left text-xl md:text-2xl font-semibold flex justify-between transition-all ${activeSection === item
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
                  }`}
              >
                {item}
                <span className="transition-transform group-hover:translate-x-1">›</span>
                {activeSection === item && (
                  <motion.span
                    layoutId="sidebar-indicator"
                    className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 h-10 w-[3px] bg-blue-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <Link
            href="/solutions"
            className="text-base md:text-lg text-gray-600 flex items-center gap-2 hover:text-blue-600 transition mt-8 md:mt-0"
          >
            All Solutions <span>›</span>
          </Link>
        </aside>

        {/* ✅ RIGHT CONTENT - RESPONSIVE */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:pl-20 lg:pl-32 md:pr-12 lg:pr-24 py-12 md:py-0">

          {/* ✅ PREMIUM TABS - RESPONSIVE */}
          <div className="relative flex flex-wrap items-center gap-6 sm:gap-8 md:gap-14 mb-8 md:mb-12">
            {(activeSection === "Industry"
              ? (["Access Point", "Network Switches"] as IndustryTab[])
              : (["Industrial Managed Switch", "PoE Fiber Switch"] as PlatformTab[])
            ).map((tab) => {
              const active =
                activeSection === "Industry"
                  ? industryTab === tab
                  : platformTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() =>
                    activeSection === "Industry"
                      ? setIndustryTab(tab as IndustryTab)
                      : setPlatformTab(tab as PlatformTab)
                  }
                  className={`relative text-base sm:text-lg md:text-xl font-semibold transition ${active ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
                    }`}
                >
                  {tab}
                  {active && (
                    <motion.span
                      layoutId="tabIndicator"
                      className="absolute -bottom-4 left-0 w-full h-[3px] bg-blue-600 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ✅ PREMIUM CONTENT TRANSITION - RESPONSIVE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent.title}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-xl"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                {activeContent.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-14 leading-relaxed">
                {activeContent.description}
              </p>

              {/* ✅ PREMIUM CTA - RESPONSIVE */}
              <Link
                href="/contact"
                className="group cursor-pointer inline-flex items-center gap-3 bg-blue-600 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-semibold tracking-wide shadow-xl hover:shadow-2xl hover:bg-blue-700 transition-all text-sm sm:text-base"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
