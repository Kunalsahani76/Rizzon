"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import productData from "../../productdata.json";

interface SubItem {
  title: string;
  href: string;
  subItems?: SubItem[];
}

interface NetworkingCategory {
  title: string;
  href: string;
  description?: string;
  subItems?: SubItem[];
}

interface Product {
  model: string;
  productType?: string;
  description?: string;
  productOverview?: string | string[];
  [key: string]: any;
}

interface CategoryGroup {
  category: string;
  products: Product[];
  [key: string]: any;
}

type ProductDataItem = Product | CategoryGroup;

// Helper to process product data into categories
const getCategoriesFromJSON = (): NetworkingCategory[] => {
  const categories: NetworkingCategory[] = [];
  const data = productData as unknown as ProductDataItem[];

  data.forEach((item) => {
    if ('category' in item && item.category) {
      // It's a category group
      const catGroup = item as CategoryGroup;
      categories.push({
        title: catGroup.category,
        href: `/products/${catGroup.category.toLowerCase().replace(/\s+/g, '-')}`,
        description: catGroup.products?.[0]?.description || `Explore our ${catGroup.category} solutions.`,
        subItems: catGroup.products?.map((prod) => ({
          title: prod.model,
          href: `/products/${prod.model.toLowerCase()}`,
        })) || []
      });
    } else if ('productType' in item && item.productType && item.model) {
      // It's a standalone product
      const product = item as Product;
      // Check if we already have a category for this productType
      const existingCat = categories.find(c => c.title === product.productType);

      let desc = "";
      if (typeof product.productOverview === 'string') {
        desc = product.productOverview;
      } else if (Array.isArray(product.productOverview) && product.productOverview.length > 0) {
        desc = product.productOverview[0];
      } else {
        desc = product.description || "";
      }

      if (existingCat) {
        existingCat.subItems?.push({
          title: product.model,
          href: `/products/${product.model.toLowerCase()}`
        });
      } else {
        categories.push({
          title: product.productType!, // Use productType as the category title
          href: `/products/${product.productType!.toLowerCase().replace(/\s+/g, '-')}`,
          description: desc,
          subItems: [{
            title: product.model,
            href: `/products/${product.model.toLowerCase()}`
          }]
        });
      }
    }
  });

  return categories;
};

const networkingCategories = getCategoriesFromJSON();

interface NetworkingDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NetworkingDropdown({ isOpen, onClose }: NetworkingDropdownProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(networkingCategories[0]?.title || null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Escape Key Closes
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Mount Animation
  useEffect(() => {
    if (!isOpen) {
      setMounted(false);
      return;
    }
    const id = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(id);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeCategory = networkingCategories.find((c) => c.title === openCategory) || networkingCategories[0];

  const getNetworkingImage = (itemName: string) => {
    // Placeholder logic for images
    return "/slide-1.jpg";
  };

  const getNetworkingContent = (itemName: string) => {
    const data = productData as unknown as ProductDataItem[];

    // Search in JSON data
    // 1. Check if itemName matches a Category
    const categoryItem = data.find((item) =>
      ('category' in item && item.category === itemName) ||
      ('productType' in item && item.productType === itemName)
    );

    if (categoryItem) {
      if ('category' in categoryItem && categoryItem.category) {
        // It's a category object
        return categoryItem.products?.[0]?.description || `Explore our ${itemName} range.`;
      } else {
        // It's a standalone product acting as a category
        const product = categoryItem as Product;
        if (typeof product.productOverview === 'string') {
          return product.productOverview;
        } else if (Array.isArray(product.productOverview) && product.productOverview.length > 0) {
          return product.productOverview[0];
        } else {
          return product.description || "High-performance networking solution.";
        }
      }
    }

    // 2. Check if itemName matches a Product Model
    // We need to search inside categories and standalone items
    for (const item of data) {
      if ('model' in item && item.model === itemName) {
        const product = item as Product;
        if (typeof product.productOverview === 'string') {
          return product.productOverview;
        } else if (Array.isArray(product.productOverview) && product.productOverview.length > 0) {
          return product.productOverview[0];
        } else {
          return product.description || "High-performance networking solution.";
        }
      }
      if ('products' in item && item.products) {
        const product = item.products.find((p: any) => p.model === itemName);
        if (product) {
          if (typeof product.productOverview === 'string') {
            return product.productOverview;
          } else if (Array.isArray(product.productOverview) && product.productOverview.length > 0) {
            return product.productOverview[0];
          } else {
            return product.description || "High-performance networking solution.";
          }
        }
      }
    }

    return "Explore our comprehensive range of networking products designed for modern enterprise environments.";
  };

  return (
    <div
      className="fixed top-[80px] left-0 right-0 z-[9999]"
      onClick={onClose}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
      ref={dropdownRef}
    >
      <div
        className={`relative transform transition-all duration-500 ease-out origin-top ${mounted ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
        style={{
          filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clipped Background Layer */}
        <div
          className="absolute inset-0 bg-white/95 backdrop-blur-xl border-t-4 border-blue-600"
          style={{
            clipPath: "url(#networkingWave)",
            zIndex: 0,
          }}
        />

        {/* Content Layer (Unclipped) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-8 pb-24">

          {/* PREMIUM 3-COLUMN LAYOUT */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[280px_380px_1fr] gap-8 items-start"
            onMouseLeave={() => setOpenCategory(networkingCategories[0]?.title || null)}
          >
            {/* LEFT COLUMN: Networking Solutions */}
            <div className="h-full border-r border-gray-100 pr-4">
              <h3 className="text-gray-900 font-bold text-lg mb-6 px-4">Networking Solutions</h3>
              <div className="space-y-1">
                {networkingCategories.map((category, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setOpenCategory(category.title)}
                    className="group"
                  >
                    <Link
                      href={category.href}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${activeCategory?.title === category.title
                        ? "text-blue-700 bg-blue-50 shadow-sm border-blue-100"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 border-transparent"
                        }`}
                    >
                      <div className="line-clamp-1" title={category.title}>{category.title}</div>
                      <span className={`text-lg transition-transform duration-300 ${activeCategory?.title === category.title ? "text-blue-500 translate-x-1" : "text-gray-400 group-hover:text-blue-400"
                        }`}>›</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* MIDDLE COLUMN: Available Options */}
            <div className="h-full border-r border-gray-100 pr-4">
              {/* Category Description */}
              {activeCategory?.description && (
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-800 font-medium leading-relaxed line-clamp-3">{activeCategory.description}</p>
                </div>
              )}

              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Available Options</h4>

              <div className="space-y-2 max-h-[500px] overflow-y-auto px-2 custom-scrollbar">
                {activeCategory?.subItems && activeCategory.subItems.map((subItem, i) => (
                  <div key={i}>
                    <Link
                      href={subItem.href}
                      onMouseEnter={() => setHoveredSubItem(subItem.title)}
                      className={`block p-3 rounded-xl text-sm transition-all duration-300 border ${hoveredSubItem === subItem.title
                        ? "bg-white border-blue-200 text-blue-700 shadow-md transform scale-[1.02]"
                        : "bg-transparent border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subItem.title}</span>
                        {subItem.subItems && (
                          <span className={hoveredSubItem === subItem.title ? "text-blue-500" : "text-gray-400"}>›</span>
                        )}
                      </div>
                    </Link>

                    {/* Nested Sub Items */}
                    {subItem.subItems && hoveredSubItem === subItem.title && (
                      <div className="ml-4 mt-2 pl-4 border-l-2 border-blue-100 space-y-1">
                        {subItem.subItems.map((nestedItem, j) => (
                          <Link
                            key={j}
                            href={nestedItem.href}
                            className="block py-2 px-3 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            {nestedItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Image & Overview */}
            <div className="flex flex-col gap-6 h-full">
              {/* Image Card */}
              <div className="bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-100 flex items-center justify-center h-[280px] group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={hoveredSubItem ? getNetworkingImage(hoveredSubItem) : getNetworkingImage(activeCategory?.title || networkingCategories[0]?.title || "")}
                  alt={hoveredSubItem || activeCategory?.title || networkingCategories[0]?.title || "Networking"}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 relative z-10 mix-blend-multiply"
                />
              </div>

              {/* Overview Card */}
              <div className="bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-100 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                  {hoveredSubItem || activeCategory?.title || networkingCategories[0]?.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
                  {getNetworkingContent(hoveredSubItem || activeCategory?.title || networkingCategories[0]?.title || "")}
                </p>
                <div className="mt-4 pt-4 cursor-pointer border-t border-gray-200 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  <span>Learn More</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Clip Path Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="networkingWave" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.92 Q0.75,1 0.5,0.92 Q0.25,0.84 0,0.92 Z">
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
                            M0,0 L1,0 L1,0.92 Q0.75,1 0.5,0.92 Q0.25,0.84 0,0.92 Z;
                            M0,0 L1,0 L1,0.92 Q0.75,0.84 0.5,0.92 Q0.25,1 0,0.92 Z;
                            M0,0 L1,0 L1,0.92 Q0.75,1 0.5,0.92 Q0.25,0.84 0,0.92 Z"
              />
            </path>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}