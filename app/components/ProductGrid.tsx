"use client";

import React from "react";

// ✅ Import your real local images
import slider1 from "../../public/grid-products/1.png";
import slider2 from "../../public/grid-products/4.png";
import slider3 from "../../public/grid-products/3.png";
import slider4 from "../../public/grid-products/2.png";
import slider5 from "../../public/grid-products/5.png";
import slider6 from "../../public/grid-products/7.png";

// ✅ Product details
const products = [
  {
    title: "Industrial PoE Switches",
    img: slider1,
    href: "/products",
    gridClasses: "col-span-1 sm:col-span-2 row-span-1 sm:row-span-2",
  },
  {
    title: "Wireless Access Points",
    img: slider2,
    href: "/products",
    gridClasses: "col-span-1 row-span-1 sm:row-span-2",
  },
  {
    title: "WAN Routers ",
    img: slider3,
    href: "/products",
    gridClasses: "col-span-1 row-span-1 sm:row-span-2",
  },
  {
    title: "Network Controllers",
    img: slider4,
    href: "/products",
    gridClasses: "col-span-1 sm:col-span-2 row-span-1 sm:row-span-2",
  },
  {
    title: "Cloud Based",
    img: slider5,
    href: "/products",
    gridClasses: "col-span-1 sm:col-span-2 row-span-1",
    imageClasses: "object-cover",
  },
  {
    title: "Software",
    img: slider6,
    href: "/products",
    gridClasses: "col-span-1 sm:col-span-2 row-span-1",
    imageClasses: "object-cover",
  },
];

export default function ProductGrid() {
  return (
    <section className="w-full bg-[#f5f6f8] py-12 md:py-20">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-5 md:px-6">
        {/* ✅ Responsive Product Grid */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6
            auto-rows-[clamp(180px,52vw,260px)]
            sm:auto-rows-[180px] md:auto-rows-[min(13.8vw,220px)]
          "
        >
          {products.map((p, i) => (
            <a
              key={i}
              href={p.href}
              className={`
                group relative overflow-hidden rounded-2xl bg-white 
                border border-gray-200 shadow-sm 
                transition-transform duration-500 hover:scale-[1.01] hover:shadow-lg
                ${p.gridClasses}
              `}
            >
              {/* ✅ Local image rendering */}
              <img
                src={p.img.src} // 👈 Important: .src to get image URL from imported file
                alt={p.title}
                className={`${p.imageClasses ?? "object-contain"} object-center transition-transform duration-700 w-full h-full`}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x400/FEE2E2/B91C1C?text=Image+Not+Found";
                }}
              />

              {/* ✅ Top-right label */}
              <div className="absolute top-4 right-5 text-sm font-medium text-gray-800 z-10 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md">
                {p.title} <span className="text-gray-500 ml-[2px]">›</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
