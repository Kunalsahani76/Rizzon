"use client";

import { FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 pt-20 pb-0 relative overflow-hidden border-t border-white/10">

      {/* ✅ Soft ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-white/5 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-32 z-10"
      >

        {/* ✅ TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">

          <Link href="/" className="relative footer-logo-mobile-align">
            <Image
              src="/newlogowhite.png"
              alt="Rizonn Logo"
              width={160}
              height={60}
              className="w-40 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
          </Link>

          {/* ✅ Social icons premium hover */}
        </div>

        {/* ✅ MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {[
            {
              title: "Company",
              items: [
                { label: 'About Rizonn', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Partners', href: '/partner' }
              ]
            },
            {
              title: "Resources",
              items: [
                { label: 'Blog', href: '/blog' },
                { label: 'Support', href: '/support' }
              ]
            },
            {
              title: "Legal",
              items: [
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-of-service' },
              ]
            },
          ].map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
            >
              <h4 className="text-white font-semibold text-lg mb-6 tracking-wide">
                {col.title}
              </h4>

              <ul className="space-y-3 text-sm text-gray-400">
                {col.items.map((item) => (
                  <li key={item.label} className="group">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 transition-all duration-300 hover:text-white"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-white transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {i === 0 && (
                <motion.a
                  href="https://www.linkedin.com/company/rizonnindia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Rizonn on LinkedIn"
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="mt-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5
                  text-gray-400 hover:text-white border border-white/10 hover:border-white/20
                  transition-all duration-300"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </motion.a>
              )}
            </motion.div>
          ))}

          {/* ✅ NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.8 }}
          >
            <div>
              <Newsletter variant="footer" />
            </div>

            {/* <div className="mt-6 text-gray-500 text-xs leading-relaxed">
              <p>Noida</p>
            </div> */}
          </motion.div>
        </div>

        {/* ✅ BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Rizonn. All rights reserved.
          </p>

          {/* <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div> */}
        </div>

      </motion.div>

      {/* ✅ ANIMATED BACKGROUND WAVES */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 opacity-20">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[150px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="-90 0"
                to="85 0"
                dur="28s"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="-90 0"
                to="85 0"
                dur="40s"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="-90 0"
                to="85 0"
                dur="20s"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.1)">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="-90 0"
                to="85 0"
                dur="10s"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
      </div>
    </footer>
  );
}
