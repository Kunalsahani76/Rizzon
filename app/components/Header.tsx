"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductDropdown from "./ProductDropdown";
import MegaMenuDropdown from "./MegaMenuDropdown";
import SearchModal from "./SearchModal";
import { getSolutionsMenuColumns } from "./MegaMenuConfig";
import { getAllProducts, Product } from "@/lib/productUtils";

// Menu items configuration
const MENU_ITEMS = [
  {
    id: 'products',
    label: 'Products',
    hasDropdown: true,
    component: ProductDropdown,
  },
  // {
  //   id: 'solutions',
  //   label: 'Solutions',
  //   hasDropdown: true,
  //   isInline: true, // Solutions dropdown is inline in Header
  // },
  {
    id: 'support',
    label: 'Support',
    href: '/support',
    hasDropdown: false,
  },
  {
    id: 'explore',
    label: 'Explore',
    href: '/about',
    hasDropdown: false,
  },
  {
    id: 'partner-portal',
    label: 'Partner Portal',
    href: '/partner',
    hasDropdown: false,
  },
];

const MOBILE_PRODUCT_MENU_ITEMS = [
  { title: "Access Points", href: "/products/access-point" },
  { title: "Controller", href: "/products/access-point-controllers" },
  { title: "AAA", href: "/products/aaa" },
  { title: "Switches", href: "/products/switches" },
  { title: "NMS", href: "/products/nms" },
  { title: "DCIM", href: "/products/dcim" },
  { title: "HMS", href: "/products/hms" },
  { title: "UVSS", href: "/products/uvss" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    products: false,
    solutions: false,
  });
  const [isBusinessSolutionsHovered, setIsBusinessSolutionsHovered] = useState(false);
  const [isNavHover, setIsNavHover] = useState(false);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Search State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    setAllProducts(getAllProducts());
  }, []);

  // Mobile Search State
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (mobileSearchQuery.trim() === "") {
      setMobileSearchResults([]);
      return;
    }

    const query = mobileSearchQuery.toLowerCase();
    const results = allProducts.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.model.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    ).slice(0, 5);

    setMobileSearchResults(results);
  }, [mobileSearchQuery, allProducts]);



  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdowns(prev => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close all dropdowns when route changes
  useEffect(() => {
    setOpenDropdowns({
      products: false,
      solutions: false,
    });
    setIsMobileMenuOpen(false);
    setIsBusinessSolutionsHovered(false);
    setIsSearchModalOpen(false);
  }, [pathname]);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        const anyDropdownOpen = Object.values(openDropdowns).some(isOpen => isOpen);
        if (!anyDropdownOpen) {
          setIsVisible(false);
        }
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, openDropdowns]);

  const handleDropdownToggle = (menuId: string, isOpen: boolean) => {
    setOpenDropdowns(prev => {
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = key === menuId ? isOpen : false;
      });
      return newState;
    });
  };



  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${!isHomePage || isScrolled || isNavHover || isSearchModalOpen
        ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/5"
        : "bg-transparent"
        } translate-y-0`}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 py-5">
        <div className="flex items-center justify-between">
          {/* Left Side: Logo and Navigation */}
          <div className="flex items-center gap-16">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setIsSearchModalOpen(false)}
              className="flex items-center cursor-pointer"
            >
              <Image
                src="/newlogowhite.png"
                alt="Rizonn Logo"
                width={140}
                height={65}
                className="object-contain w-32 hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-8"
              onMouseEnter={() => setIsNavHover(true)}
              onMouseLeave={() => setIsNavHover(false)}
            >
              {MENU_ITEMS.map((item) => {
                if (!item.hasDropdown) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href || '#'}
                      onClick={() => setIsSearchModalOpen(false)}
                      className="relative text-[15px] font-medium tracking-wide text-gray-300 hover:text-white transition-colors group py-2"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                    </Link>
                  );
                }

                const isOpen = openDropdowns[item.id];
                const DropdownComponent = item.component;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    ref={(el) => { dropdownRefs.current[item.id] = el; }}
                    onMouseOver={() => handleDropdownToggle(item.id, true)}
                  >
                    <button
                      className={`relative text-[15px] font-medium tracking-wide cursor-pointer flex items-center gap-1.5 focus:outline-none py-2 transition-colors ${isOpen ? "text-white" : "text-gray-300 hover:text-white"
                        }`}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-400" : "text-gray-500 group-hover:text-gray-300"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ${isOpen ? "w-full opacity-100" : "w-0 opacity-0"}`} />
                    </button>

                    {/* Render dropdown component or inline Solutions */}
                    {DropdownComponent && (
                      <DropdownComponent
                        isOpen={isOpen}
                        onClose={() => handleDropdownToggle(item.id, false)}
                      />
                    )}


                    {/* Solutions Dropdown using Common Component */}
                    {item.id === 'solutions' && (
                      <MegaMenuDropdown
                        isOpen={isOpen}
                        onClose={() => handleDropdownToggle('solutions', false)}
                        columns={getSolutionsMenuColumns(isBusinessSolutionsHovered)}
                      />
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Controls */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="flex items-center bg-white rounded-full px-5 text-black shadow-sm h-[48px] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <span className="w-20 text-[13px] text-gray-500 text-left">Search...</span>
                <svg className="w-3.5 h-3.5 ml-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Language */}



              {/* Contact Sales */}
              <Link
                href="/contact"
                onClick={() => setIsSearchModalOpen(false)}
                className="inline-flex items-center gap-2 bg-[#196fd2] text-white px-6 py-4 rounded-full hover:bg-blue-600 transition-colors text-[14px] font-medium cursor-pointer h-[48px]"
              >
                <span>Contact Sales</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 h-[calc(100vh-80px)] overflow-y-auto bg-black/90 backdrop-blur-8xl border-t border-white/10 shadow-4xl animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col p-6 text-white font-nexa-regular max-w-lg mx-auto">

              {/* Products Dropdown */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => setOpenDropdowns(prev => ({
                    products: !prev.products,
                    solutions: false
                  }))}
                  className="flex justify-between items-center w-full py-4 text-left transition-all duration-300 font-nexa-bold cursor-pointer group"
                >
                  <span className="text-lg group-hover:text-blue-400 transition-colors">Products</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${openDropdowns.products ? 'rotate-180 text-blue-500' : 'text-gray-400'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns.products ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-white/5 rounded-xl p-3 space-y-1 border border-white/5">
                    {MOBILE_PRODUCT_MENU_ITEMS.map((category, index) => (
                      <Link
                        key={index}
                        href={category.href}
                        className="block py-2.5 px-4 text-sm text-gray-300 transition-all cursor-pointer hover:text-white hover:bg-white/10 rounded-lg"
                        onClick={() => {
                          setOpenDropdowns({ products: false, solutions: false });
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>


              {/* Support */}
              <Link
                href="/support"
                className="block py-4 text-lg border-b border-white/10 font-nexa-regular cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>

              {/* Explore */}
              <Link
                href="/about"
                className="block py-4 text-lg border-b border-white/10 font-nexa-regular cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore
              </Link>

              {/* Partner Portal */}
              <Link
                href="/partner"
                className="block py-4 text-lg border-b border-white/10 font-nexa-regular cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partner Portal
              </Link>

              {/* Mobile Search */}
              <div className="relative mt-8">
                <input
                  type="text"
                  placeholder="Search..."
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all"
                />
                <svg
                  className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                {/* Mobile Search Results */}
                {mobileSearchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-xl border border-white/10 overflow-hidden z-50 shadow-xl">
                    {mobileSearchResults.map((product, index) => (
                      <Link
                        key={index}
                        href={`/products/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.model.toLowerCase()}`}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                        onClick={() => {
                          setMobileSearchQuery("");
                          setMobileSearchResults([]);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={product.img || "/slide-1.jpg"}
                            alt={product.model}
                            className="w-8 h-8 object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white truncate">
                            {product.title}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">{product.model}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Contact Sales */}
              <div className="pt-6">
                <Link href="/contact" className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-6 rounded-full transition-all duration-300 font-nexa-bold cursor-pointer shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group">
                  <span>Contact Sales</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </header>
  );
}
